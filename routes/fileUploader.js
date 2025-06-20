import express from "express";
import multer from "multer";

const router = express.Router();

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // where to store uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName); // rename file
  },
});

// Use storage in multer initialization
const upload = multer({ storage: storage });

// validate file types & limit
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype === "image/png" ||
//       file.mimetype === "image/jpeg" ||
//       file.mimetype === "application/pdf"
//     ) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only images and PDFs allowed"));
//     }
//   },
// });

// upload multiple files
router.post("/multi", upload.array("myFiles", 5), (req, res) => {
  if (!req.files) {
    return res.status(400).send("No file uploaded.");
  }
  res.json({
    message: "Files uploaded successfully!",
    files: req.files,
  });
});

// Upload route (single file)
router.post("/upload", upload.single("myFile"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.json({
    message: "File uploaded successfully!",
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
  });
});

export default router;
