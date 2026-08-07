const { validationResult } = require("express-validator");
const { fail } = require("../lib/response");

// Run after express-validator checks. Returns 400 with field errors if invalid.
function validate(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array().map((e) => ({
      field: e.path || e.param,
      message: e.msg,
    }));
    return fail(res, 400, "Validation failed", { errors });
  }
  return next();
}

// XSS hardening: strip <script>/on* attributes from string body fields.
const XSS_PATTERN = /<\s*\/?\s*script[\s\S]*?>/gi;
const EVENT_PATTERN = /\son\w+\s*=/gi;

function sanitizeString(value) {
  if (typeof value !== "string") return value;
  return value.replace(XSS_PATTERN, "").replace(EVENT_PATTERN, " ");
}

function sanitize(req, res, next) {
  const scrub = (obj) => {
    for (const key of Object.keys(obj)) {
      const v = obj[key];
      if (typeof v === "string") obj[key] = sanitizeString(v);
      else if (Array.isArray(v)) v.forEach((item) => (typeof item === "object" ? scrub(item) : null));
      else if (v && typeof v === "object") scrub(v);
    }
  };
  if (req.body && typeof req.body === "object") scrub(req.body);
  return next();
}

module.exports = { validate, sanitize };
