const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure 'uploads' folder exists
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // saves in /uploads
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    cb(new Error("Only JPG and PNG images are allowed"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 }, // 1MB
  fileFilter,
});

module.exports = upload;
