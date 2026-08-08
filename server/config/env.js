const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

const envPath = path.resolve(__dirname, "../../.env");
const examplePath = path.resolve(__dirname, "../../.env.example");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else if (fs.existsSync(examplePath)) {
  dotenv.config({ path: examplePath });
}

const port = parseInt(process.env.PORT || "3000", 10);
const isProd = process.env.NODE_ENV === "production";

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: port,
  HOST: "0.0.0.0",
  isProd,

  DATABASE_URL: process.env.DATABASE_URL || "",
  DIRECT_URL: process.env.DIRECT_URL || process.env.DATABASE_URL || "",

  JWT_SECRET:
    process.env.JWT_SECRET || "change-me-in-production-please-generate-a-secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",

  APP_URL: process.env.APP_URL || `http://localhost:${port}`,
  CORS_ORIGINS: (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),

  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || "100", 10),
  RATE_LIMIT_WINDOW_MS: parseInt(
    process.env.RATE_LIMIT_WINDOW_MS || "60000",
    10
  ),

  UPLOAD_DIR: process.env.UPLOAD_DIR || path.resolve(__dirname, "../../public/uploads"),
  MAX_UPLOAD_MB: parseInt(process.env.MAX_UPLOAD_MB || "8", 10),
};

// Fail fast in production if critical secrets are missing.
if (env.isProd) {
  const missing = [];
  if (!env.DATABASE_URL) missing.push("DATABASE_URL");
  if (!process.env.JWT_SECRET) missing.push("JWT_SECRET");
  if (missing.length) {
    // eslint-disable-next-line no-console
    console.error(
      `Missing required environment variable(s): ${missing.join(", ")}. ` +
        "Copy .env.example to .env and fill in the values."
    );
    process.exit(1);
  }
}

module.exports = env;
