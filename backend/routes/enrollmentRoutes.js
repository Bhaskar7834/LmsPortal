import express from "express";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js"; // ✅ Add this
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * ==========================================================
 * 📚 ENROLLMENT ROUTES
 * Base URL → /api/enrollments
 * ==========================================================
 */

/**
 * @route   POST /api/enrollments
 * @desc    Enroll a student in a course
 * @access  Private
 */
router.post("/", protect, async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId)
      return res
        .status(400)
        .json({ success: false, message: "User ID and Course ID are required" });

    const existing = await Enrollment.findOne({ userId, courseId });
    if (existing)
      return res
        .status(400)
        .json({ success: false, message: "Already enrolled in this course" });

    const enrollment = await Enrollment.create({ userId, courseId });

    return res.status(201).json({
      success: true,
      message: "Enrollment successful 🎉",
      data: enrollment,
    });
  } catch (error) {
    console.error("❌ Enrollment Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error during enrollment",
    });
  }
});

/**
 * @route   GET /api/enrollments/:userId
 * @desc    Get all courses a student is enrolled in
 * @access  Private
 */
router.get("/:userId", protect, async (req, res) => {
  try {
    const { userId } = req.params;
    const enrollments = await Enrollment.find({ userId }).populate("courseId");

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments,
    });
  } catch (error) {
    console.error("❌ Error fetching enrollments:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch enrolled courses",
    });
  }
});

/**
 * @route   GET /api/enrollments/details/:enrollmentId
 * @desc    Get full course details (with lessons & videos) for a specific enrollment
 * @access  Private
 */
router.get("/details/:enrollmentId", protect, async (req, res) => {
  try {
    const { enrollmentId } = req.params;

    const enrollment = await Enrollment.findById(enrollmentId).populate({
      path: "courseId",
      model: "Course",
      populate: {
        path: "lessons",
        model: "Lesson", // ✅ Adjust to your actual model name
      },
    });

    if (!enrollment)
      return res
        .status(404)
        .json({ success: false, message: "Enrollment not found" });

    const course = enrollment.courseId;

    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    // ✅ Return full course object with lesson data
    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.error("❌ Error fetching course details:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error fetching course details",
    });
  }
});

/**
 * @route   PATCH /api/enrollments/progress
 * @desc    Update course progress for a student
 * @access  Private
 */
router.patch("/progress", protect, async (req, res) => {
  try {
    const { courseId, progressPercent, lastWatchedVideo } = req.body;
    const userId = req.user._id;

    if (!courseId || progressPercent === undefined) {
      return res.status(400).json({
        success: false,
        message: "Course ID and progress percentage are required",
      });
    }

    const enrollment = await Enrollment.findOne({ userId, courseId });
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found for this user/course",
      });
    }

    // ✅ Update progress (only forward)
    if (progressPercent > enrollment.progress) {
      enrollment.progress = progressPercent;
      enrollment.lastAccessed = new Date();
    }

    // ✅ Save last watched video (Cloudinary URL)
    if (lastWatchedVideo) {
      enrollment.lastWatchedVideo = lastWatchedVideo;
    }

    // ✅ Auto-mark as completed
    if (progressPercent >= 100 && enrollment.status !== "completed") {
      enrollment.status = "completed";
      enrollment.completionDate = new Date();
    }

    await enrollment.save();

    res.status(200).json({
      success: true,
      message: "Progress updated successfully ✅",
      data: enrollment,
    });
  } catch (error) {
    console.error("❌ Progress update failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while updating progress",
    });
  }
});

export default router;
