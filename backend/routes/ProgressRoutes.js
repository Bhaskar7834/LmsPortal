import express from "express";
import Progress from "../models/Progress.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * ==========================================================
 * 📈 PROGRESS ROUTES
 * Base URL → /api/progress
 * ==========================================================
 */

/**
 * @route   PATCH /api/progress/update
 * @desc    Update or create progress for a specific video
 * @access  Private
 */
router.patch("/update", protect, async (req, res) => {
  try {
    const { courseId, videoId, progressPercent } = req.body;
    const userId = req.user._id;

    if (!courseId || !videoId) {
      return res.status(400).json({
        success: false,
        message: "Course ID and video ID are required",
      });
    }

    const completed = progressPercent >= 90;

    const progress = await Progress.findOneAndUpdate(
      { userId, courseId, videoId },
      {
        progressPercent,
        completed,
        lastUpdated: new Date(),
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Progress updated successfully ✅",
      data: progress,
    });
  } catch (err) {
    console.error("❌ Progress update failed:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while updating progress",
    });
  }
});

/**
 * @route   GET /api/progress/:userId/:courseId
 * @desc    Get all video progress for a course
 * @access  Private
 */
router.get("/:userId/:courseId", protect, async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const progressList = await Progress.find({ userId, courseId });
    res.status(200).json({
      success: true,
      count: progressList.length,
      data: progressList,
    });
  } catch (err) {
    console.error("❌ Progress fetch failed:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching progress",
    });
  }
});

export default router;
