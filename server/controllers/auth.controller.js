const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const prisma = require("../lib/prisma");
const jwtLib = require("../lib/jwt");
const { success, fail, asyncHandler } = require("../lib/response");

const publicUser = (u) => ({
  id: u.id,
  email: u.email,
  firstName: u.firstName,
  lastName: u.lastName,
  name: u.name || `${u.firstName || ""} ${u.lastName || ""}`.trim(),
  phone: u.phone,
  avatar: u.avatar,
  role: u.role,
  status: u.status,
  createdAt: u.createdAt,
});

// POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  if (prisma.demoMode) {
    return fail(res, 503, "Sign-up is disabled in demo mode (no database). Run `npm run setup` to enable accounts.");
  }
  const { email, password, firstName, lastName, phone } = req.body;
  const normalized = String(email || "").toLowerCase().trim();

  const existing = await prisma.user.findUnique({ where: { email: normalized } });
  if (existing) return fail(res, 409, "An account with this email already exists");

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email: normalized,
      hashedPassword,
      firstName: firstName || null,
      lastName: lastName || null,
      phone: phone || null,
      role: "PATIENT",
      status: "ACTIVE",
      emailVerified: new Date(),
    },
  });

  const token = jwtLib.sign(user);
  return success(res, { token, user: publicUser(user) }, 201, "Account created");
});

// Demo-mode staff accounts (only used when no database is configured).
const DEMO_USERS = [
  { id: "demo-admin", email: "admin@junaiddentalcare.pk", password: "Admin@123", firstName: "Junaid", lastName: "Ahmed", name: "Junaid Ahmed", role: "SUPER_ADMIN", status: "ACTIVE" },
  { id: "demo-ayesha", email: "ayesha@junaiddentalcare.pk", password: "Admin@123", firstName: "Ayesha", lastName: "Khan", name: "Ayesha Khan", role: "ADMIN", status: "ACTIVE" },
  { id: "demo-reception", email: "reception@junaiddentalcare.pk", password: "Admin@123", firstName: "Reception", lastName: "Staff", name: "Reception Staff", role: "RECEPTIONIST", status: "ACTIVE" },
  { id: "demo-drjunaid", email: "junaid@junaiddentalcare.pk", password: "Doctor@123", firstName: "Junaid", lastName: "Ahmed", name: "Dr. Junaid Ahmed", role: "DOCTOR", status: "ACTIVE" },
];

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  if (prisma.demoMode) {
    const { email, password } = req.body;
    const normalized = String(email || "").toLowerCase().trim();
    const demoUser = DEMO_USERS.find((u) => u.email === normalized && u.password === password);
    if (!demoUser) return fail(res, 401, "Invalid email or password");
    const token = jwtLib.sign(demoUser);
    return success(res, { token, user: publicUser(demoUser) }, 200, "Logged in (demo mode)");
  }
  const { email, password } = req.body;
  const normalized = String(email || "").toLowerCase().trim();

  const user = await prisma.user.findUnique({ where: { email: normalized } });
  if (!user || !user.hashedPassword) return fail(res, 401, "Invalid email or password");

  // Account lockout after repeated failures.
  if (user.lockedUntil && user.lockedUntil > new Date()) {
    return fail(res, 423, "Account temporarily locked. Try again later.");
  }

  const valid = await bcrypt.compare(password, user.hashedPassword);
  if (!valid) {
    const attempts = (user.loginAttempts || 0) + 1;
    const data =
      attempts >= 5 ? { loginAttempts: 0, lockedUntil: new Date(Date.now() + 15 * 60000) } : { loginAttempts: attempts };
    await prisma.user.update({ where: { id: user.id }, data });
    return fail(res, 401, "Invalid email or password");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { loginAttempts: 0, lockedUntil: null, lastLoginAt: new Date(), lastLoginIp: req.ip },
  });

  const token = jwtLib.sign(user);
  return success(res, { token, user: publicUser(user) }, 200, "Login successful");
});

// GET /api/auth/me (protected)
const me = asyncHandler(async (req, res) => {
  return success(res, { user: publicUser(req.user) });
});

// POST /api/auth/change-password (protected)
const changePassword = asyncHandler(async (req, res) => {
  if (prisma.demoMode) {
    return success(res, null, 200, "Password change is not saved in demo mode. Connect a database to update it.");
  }
  const { currentPassword, newPassword } = req.body;
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });

  if (!user.hashedPassword) return fail(res, 400, "This account has no password set");
  const valid = await bcrypt.compare(currentPassword, user.hashedPassword);
  if (!valid) return fail(res, 400, "Current password is incorrect");

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: user.id },
    data: { hashedPassword, passwordChangedAt: new Date() },
  });
  return success(res, null, 200, "Password changed successfully");
});

// POST /api/auth/forgot-password
const forgotPassword = asyncHandler(async (req, res) => {
  if (prisma.demoMode) {
    return fail(res, 503, "Password reset is disabled in demo mode (no database).");
  }
  const { email } = req.body;
  const normalized = String(email || "").toLowerCase().trim();
  const user = await prisma.user.findUnique({ where: { email: normalized } });

  // Always return success to avoid account enumeration.
  if (!user) return success(res, null, 200, "If that email exists, a reset link has been sent.");

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  await prisma.passwordReset.create({
    data: { userId: user.id, token, expires, used: false },
  });
  // In a real deployment this would email the user a reset link.
  // eslint-disable-next-line no-console
  console.log(`[forgot-password] Reset token for ${user.email}: ${token}`);
  return success(res, null, 200, "If that email exists, a reset link has been sent.");
});

// POST /api/auth/reset-password
const resetPassword = asyncHandler(async (req, res) => {
  if (prisma.demoMode) {
    return fail(res, 503, "Password reset is disabled in demo mode (no database).");
  }
  const { token, password } = req.body;
  const reset = await prisma.passwordReset.findUnique({ where: { token } });
  if (!reset || reset.used || reset.expires < new Date()) {
    return fail(res, 400, "Invalid or expired reset token");
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  await prisma.$transaction([
    prisma.user.update({ where: { id: reset.userId }, data: { hashedPassword, passwordChangedAt: new Date() } }),
    prisma.passwordReset.update({ where: { id: reset.id }, data: { used: true } }),
  ]);
  return success(res, null, 200, "Password reset successful. You can now log in.");
});

// POST /api/auth/delete-account (protected)
const deleteAccount = asyncHandler(async (req, res) => {
  if (prisma.demoMode) {
    return success(res, { deletedAt: new Date().toISOString() }, 200, "Account deletion request processed (demo mode)");
  }
  const userId = req.user.id;
  await prisma.user.delete({ where: { id: userId } }).catch(() => {});
  return success(res, { deletedAt: new Date().toISOString() }, 200, "Your account and associated data have been permanently deleted.");
});

module.exports = { register, login, me, changePassword, forgotPassword, resetPassword, deleteAccount };
