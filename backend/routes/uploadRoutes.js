/**
 * ==========================================================
 * ☁️ UPLOAD ROUTES
 * Allows admins to upload images or videos to Cloudinary
 * Base URL → /api/upload
 * ==========================================================
 */

import express from "express";
import upload from "../middleware/upload.js";
import { v2 as cloudinary } from "cloudinary";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ==========================================================
   🧠 TEST CONNECTION — GET /api/upload/test
========================================================== */
router.get("/test", async (req, res) => {
  try {
    const ping = await cloudinary.api.ping();
    res.status(200).json({
      success: true,
      message: "☁️ Cloudinary connection successful!",
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (error) {
    console.error("❌ Cloudinary test failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Cloudinary test failed",
      error: error.message,
    });
  }
});

/* ==========================================================
   📸 SINGLE IMAGE UPLOAD (Admin only)
   POST /api/upload/image
========================================================== */
router.post(
  "/image",
  protect,
  adminOnly,
  upload.single("thumbnail"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "No file uploaded" });
      }

      res.status(200).json({
        success: true,
        message: "✅ Image uploaded successfully",
        url: req.file.path,
        public_id: req.file.filename,
      });
    } catch (error) {
      console.error("❌ Image upload failed:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to upload image",
        error: error.message,
      });
    }
  }
);

/* ==========================================================
   🎥 MULTIPLE VIDEO UPLOADS (Admin only)
   POST /api/upload/videos
========================================================== */
router.post(
  "/videos",
  protect,
  adminOnly,
  upload.array("videos", 3),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "No videos uploaded" });
      }

      const urls = req.files.map((file) => file.path);
      res.status(200).json({
        success: true,
        message: "🎬 Videos uploaded successfully",
        urls,
      });
    } catch (error) {
      console.error("❌ Video upload failed:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to upload videos",
        error: error.message,
      });
    }
  }
);

export default router;
