const router = require("express").Router();
const { body } = require("express-validator");
const c = require("../controllers/auth.controller");
const { validate, sanitize } = require("../middleware/validate");
const { requireAuth } = require("../middleware/auth");
const { authLimiter } = require("../middleware/rateLimiter");

const passwordCheck = body("password")
  .isString()
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters")
  .matches(/[A-Z]/).withMessage("Password must contain an uppercase letter")
  .matches(/[0-9]/).withMessage("Password must contain a number");

const emailCheck = body("email").isEmail().withMessage("Enter a valid email address").normalizeEmail();

// /api/auth/register
router.post(
  "/register",
  authLimiter,
  sanitize,
  [
    emailCheck,
    passwordCheck,
    body("firstName").optional().isLength({ max: 100 }),
    body("lastName").optional().isLength({ max: 100 }),
  ],
  validate,
  c.register
);

// /api/auth/login
router.post(
  "/login",
  authLimiter,
  sanitize,
  [emailCheck, body("password").isString().notEmpty().withMessage("Password is required")],
  validate,
  c.login
);

// /api/auth/me
router.get("/me", requireAuth, c.me);

// /api/auth/change-password
router.post(
  "/change-password",
  requireAuth,
  sanitize,
  [
    body("currentPassword").isString().notEmpty().withMessage("Current password is required"),
    passwordCheck,
  ],
  validate,
  c.changePassword
);

// /api/auth/forgot-password
router.post("/forgot-password", authLimiter, sanitize, [emailCheck], validate, c.forgotPassword);

// /api/auth/reset-password
router.post(
  "/reset-password",
  authLimiter,
  sanitize,
  [body("token").isString().notEmpty(), passwordCheck],
  validate,
  c.resetPassword
);

module.exports = router;
