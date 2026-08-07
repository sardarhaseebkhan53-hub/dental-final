const multer = require("multer");
const path = require("path");
const fs = require("fs");
const env = require("./env");

// Ensure the uploads directory exists.
fs.mkdirSync(env.UPLOAD_DIR, { recursive: true });

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, env.UPLOAD_DIR),
  filename: (req, file, cb) => {
    const safeName = file.originalname
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, "-")
      .replace(/\s+/g, "-");
    const ext = path.extname(safeName) || ".jpg";
    const base = path.basename(safeName, ext).slice(0, 40);
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${base}-${unique}${ext}`);
  },
});

function fileFilter(req, file, cb) {
  if (!ALLOWED.has(file.mimetype)) {
    const err = new Error("Unsupported file type. Allowed: jpg, png, webp, gif, svg");
    err.status = 400;
    return cb(err, false);
  }
  return cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: env.MAX_UPLOAD_MB * 1024 * 1024, files: 10 },
});

module.exports = upload;
