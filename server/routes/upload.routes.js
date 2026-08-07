const router = require("express").Router();
const upload = require("../config/multer");
const { requireAuth } = require("../middleware/auth");
const { success } = require("../lib/response");

// POST /api/upload (multipart field "file" or "files")
router.post("/", requireAuth, upload.array("files", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  const items = req.files.map((f) => ({
    name: f.originalname,
    fileUrl: `/uploads/${f.filename}`,
    fileType: f.mimetype,
    fileSize: f.size,
  }));
  return success(res, items, 201, "Upload successful");
});

module.exports = router;
