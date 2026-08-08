const jwtLib = require("../lib/jwt");
const { fail } = require("../lib/response");
const prisma = require("../lib/prisma");

function extractToken(req) {
  const header = req.headers.authorization || "";
  if (header.startsWith("Bearer ")) return header.slice(7);
  return null;
}

// Requires a valid JWT. Attaches req.user (fresh from DB) and req.jwt.
async function requireAuth(req, res, next) {
  const token = extractToken(req);
  if (!token) return fail(res, 401, "Authentication required");

  let payload;
  try {
    payload = jwtLib.verify(token);
  } catch {
    return fail(res, 401, "Invalid or expired token. Please log in again.");
  }

  let user;
  try {
    user = await prisma.user.findUnique({ where: { id: payload.sub } });
  } catch {
    // Demo mode (no database): trust the signed JWT payload so the admin
    // panel stays usable with sample data.
    if (prisma.demoMode) {
      req.user = {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
        name: payload.name,
        firstName: payload.name || "",
        lastName: "",
        status: "ACTIVE",
        createdAt: new Date(),
      };
      req.jwt = payload;
      return next();
    }
    return fail(res, 503, "Database is not configured yet. Please run the setup steps.");
  }
  if (!user) return fail(res, 401, "Account not found");
  if (user.status !== "ACTIVE") {
    return fail(res, 403, "Your account is not active. Contact an administrator.");
  }

  req.user = user;
  req.jwt = payload;
  return next();
}

// Restrict to one or more roles.
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return fail(res, 401, "Authentication required");
    if (!roles.includes(req.user.role)) {
      return fail(res, 403, "You do not have permission to perform this action");
    }
    return next();
  };
}

module.exports = { requireAuth, requireRole, extractToken };
