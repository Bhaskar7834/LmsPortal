import express from "express";
import mongoose from "mongoose";
import Course from "../models/Course.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ==========================================================
   📚 COURSE ROUTES
   Base URL → /api/courses
   ========================================================== */

/**
 * @route   GET /api/courses
 * @desc    Fetch all available courses (Public)
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    if (!courses.length) {
      return res.status(200).json({
        success: true,
        message: "No courses available yet",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error("❌ Error fetching courses:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching courses",
    });
  }
});

/**
 * @route   GET /api/courses/:id
 * @desc    Fetch single course details
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Check if valid ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      const course = await Course.findById(id);
      if (!course)
        return res
          .status(404)
          .json({ success: false, message: "Course not found" });

      return res.status(200).json({ success: true, data: course });
    }

    // ✅ Static fallback demo courses (for Abacus, Vedic, etc.)
    const demoCourses = {
      abacus: {
        title: "Abacus Program",
        description:
          "Unlock mathematical potential with engaging abacus training designed for young learners.",
        videoUrl:
          "https://res.cloudinary.com/dyydz363x/video/upload/v1762944164/videoplayback_1_n8qlem.mp4",
        instructor: "AEIS Faculty",
        thumbnail:
          "https://res.cloudinary.com/dyydz363x/image/upload/v1762944164/abacus-program.png",
      },
      vedic: {
        title: "Vedic Maths Mastery",
        description:
          "Discover the world's fastest mental math system through ancient Vedic methods.",
        videoUrl:
          "https://res.cloudinary.com/dyydz363x/video/upload/v1762944596/videoplayback_2_t5ms35.mp4",
        instructor: "AEIS Faculty",
        thumbnail:
          "https://res.cloudinary.com/dyydz363x/image/upload/v1762944596/vedic-maths.png",
      },
      handwriting: {
        title: "Handwriting Improvement",
        description:
          "Transform messy handwriting into neat, confident penmanship with guided practice.",
        videoUrl:
          "https://res.cloudinary.com/dyydz363x/video/upload/v1762944785/videoplayback_3_v6e83e.mp4",
        instructor: "AEIS Faculty",
        thumbnail:
          "https://res.cloudinary.com/dyydz363x/image/upload/v1762944785/handwriting-program.png",
      },
      olympiad: {
        title: "Olympiad Preparation",
        description:
          "Prepare to excel in national and international Olympiads with structured coaching.",
        videoUrl:
          "https://res.cloudinary.com/dyydz363x/video/upload/v1762944951/videoplayback_4_jvvkkb.mp4",
        instructor: "AEIS Faculty",
        thumbnail:
          "https://res.cloudinary.com/dyydz363x/image/upload/v1762944951/olympiad-program.png",
      },
    };

    const course = demoCourses[id];
    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Invalid course ID" });

    return res.status(200).json({ success: true, data: course });
  } catch (error) {
    console.error("❌ Error retrieving course:", error.message);
    res.status(500).json({
      success: false,
      message: "Error retrieving course details",
    });
  }
});

/**
 * @route   POST /api/courses
 * @desc    Add new course (Admin only)
 * @access  Private
 */
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { title, description, videoUrl, instructor, thumbnail, category } =
      req.body;

    if (!title || !description || !videoUrl) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and video URL are required",
      });
    }

    const newCourse = await Course.create({
      title,
      description,
      videoUrl,
      instructor: instructor || "AEIS Faculty",
      thumbnail:
        thumbnail ||
        "https://res.cloudinary.com/dyydz363x/image/upload/v1720000000/default-course.png",
      category: category || "General",
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Course added successfully 🎉",
      data: newCourse,
    });
  } catch (error) {
    console.error("❌ Error creating course:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
});

/**
 * @route   PUT /api/courses/:id
 * @desc    Update a course (Admin only)
 * @access  Private
 */
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCourse)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    res.status(200).json({
      success: true,
      message: "Course updated successfully ✅",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("❌ Error updating course:", error.message);
    res.status(500).json({ success: false, message: "Failed to update course" });
  }
});

/**
 * @route   DELETE /api/courses/:id
 * @desc    Delete a course (Admin only)
 * @access  Private
 */
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    res.status(200).json({
      success: true,
      message: "Course deleted successfully 🗑️",
    });
  } catch (error) {
    console.error("❌ Error deleting course:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete course" });
  }
});

export default router;
