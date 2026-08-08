const path = require("path");
const fs = require("fs");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const env = require("./config/env");
const { apiLimiter } = require("./middleware/rateLimiter");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth.routes");
const publicRoutes = require("./routes/public.routes");
const adminRoutes = require("./routes/admin.routes");
const uploadRoutes = require("./routes/upload.routes");

const app = express();
app.disable("x-powered-by");

const PUBLIC_DIR = path.resolve(__dirname, "../public");
fs.mkdirSync(path.join(PUBLIC_DIR, "uploads"), { recursive: true });

// ── Security middleware ────────────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https://images.unsplash.com", "https://via.placeholder.com", "https://*.googleapis.com", "https://*.ggpht.com", "https://*.fbcdn.net", "blob:"],
        connectSrc: ["'self'"],
        frameSrc: ["'self'", "https://www.google.com", "https://maps.google.com", "https://www.facebook.com"],
        formAction: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

app.use(
  cors({
    origin(origin, cb) {
      // Allow same-origin requests and any explicitly configured origins.
      if (!origin || !env.CORS_ORIGINS.length || env.CORS_ORIGINS.includes(origin)) return cb(null, true);
      return cb(null, false);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// ── Static assets ──────────────────────────────────────────────────────────
// Extensionless .html serving first so directory names like /services and
// /blog resolve to their .html page instead of being treated as folders.
app.use((req, res, next) => {
  if (req.method !== "GET" || path.extname(req.path)) return next();
  const htmlPath = path.join(PUBLIC_DIR, req.path + ".html");
  if (fs.existsSync(htmlPath)) return res.sendFile(htmlPath);
  return next();
});

app.use("/uploads", express.static(path.join(PUBLIC_DIR, "uploads")));
app.use(express.static(PUBLIC_DIR));

// Dynamic detail pages: /services/:slug and /blog/:slug render a shared template.
app.get("/services/:slug", (req, res) => res.sendFile(path.join(PUBLIC_DIR, "services/detail.html")));
app.get("/blog/:slug", (req, res) => res.sendFile(path.join(PUBLIC_DIR, "blog/detail.html")));

// ── API routes ─────────────────────────────────────────────────────────────
app.use("/api", apiLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/health", (req, res) => res.json({ success: true, message: "ok" }));

// ── 404 + error handling ───────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
