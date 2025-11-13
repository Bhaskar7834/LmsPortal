/**
 * ==========================================================
 * ☁️ CLOUDINARY + MULTER MIDDLEWARE
 * Handles all media uploads (images/videos) directly to Cloudinary
 * ==========================================================
 */

import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

/* ==========================================================
   🔐 CLOUDINARY CONFIGURATION
   Loaded securely from .env
========================================================== */
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
  console.error("❌ Missing Cloudinary credentials in .env file.");
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ==========================================================
   🗂️ MULTER + CLOUDINARY STORAGE
   Automatically uploads media to your Cloudinary folder
========================================================== */
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video/");
    const folderName = isVideo ? "videos" : "uploads";

    return {
      folder: folderName,
      resource_type: isVideo ? "video" : "image",
      allowed_formats: ["jpg", "jpeg", "png", "webp", "avif", "mp4"],
      public_id: `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    };
  },
});

/* ==========================================================
   ⚙️ MULTER CONFIGURATION
   Validates and limits uploads
========================================================== */
const upload = multer({
  storage,
  limits: {
    fileSize: 30 * 1024 * 1024, // Max 30MB (supports short videos)
  },
  fileFilter: (req, file, cb) => {
    const allowedExt = /jpeg|jpg|png|webp|avif|mp4/;
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedExt.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error("❌ Unsupported file type. Allowed: JPG, PNG, WEBP, AVIF, MP4"));
    }
  },
});

/* ==========================================================
   🧩 EXPORTS
   Use examples:
   - upload.single("thumbnail") → for 1 image
   - upload.array("videos", 5) → for multiple videos
========================================================== */
export default upload;
