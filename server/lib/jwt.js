const jwt = require("jsonwebtoken");
const env = require("../config/env");

function sign(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim(),
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );
}

function verify(token) {
  return jwt.verify(token, env.JWT_SECRET);
}

module.exports = { sign, verify };
