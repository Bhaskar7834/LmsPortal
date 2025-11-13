import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleAuth.js";

// Models
import Course from "../models/Course.js";
import User from "../models/User.js";
import Enrollment from "../models/Enrollment.js";
import DemoBooking from "../models/DemoBooking.js"; // optional — only if you added demo form

const router = express.Router();

/* ==========================================================
   🎓 ADMIN COURSE MANAGEMENT + DASHBOARD ROUTES
   Base Path → /api/admin
   Access → Admin only
   ========================================================== */

/**
 * 📚 GET all courses
 */
router.get("/courses", protect, requireRole("admin"), async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    console.error("❌ Error fetching courses:", error.message);
    res.status(500).json({ success: false, message: "Failed to load courses" });
  }
});

/**
 * ➕ CREATE a new course
 */
router.post("/courses", protect, requireRole("admin"), async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, instructor, category } = req.body;

    if (!title || !description || !videoUrl) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and video URL are required",
      });
    }

    const course = await Course.create({
      title,
      description,
      videoUrl,
      thumbnail: thumbnailUrl,
      instructor: instructor || "AEIS Faculty",
      category: category || "General",
      createdBy: req.user?._id,
    });

    res.status(201).json({ success: true, message: "Course created successfully 🎉", data: course });
  } catch (error) {
    console.error("❌ Error creating course:", error.message);
    res.status(400).json({ success: false, message: error.message || "Failed to create course" });
  }
});

/**
 * ✏️ UPDATE course
 */
router.put("/courses/:id", protect, requireRole("admin"), async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, message: "Course updated ✅", data: updatedCourse });
  } catch (error) {
    console.error("❌ Error updating course:", error.message);
    res.status(500).json({ success: false, message: "Failed to update course" });
  }
});

/**
 * 🗑️ DELETE a course
 */
router.delete("/courses/:id", protect, requireRole("admin"), async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, message: "Course deleted successfully 🗑️" });
  } catch (error) {
    console.error("❌ Error deleting course:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete course" });
  }
});

/**
 * 🔍 GET single course by ID
 */
router.get("/courses/:id", protect, requireRole("admin"), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    console.error("❌ Error fetching course:", error.message);
    res.status(500).json({ success: false, message: "Failed to load course" });
  }
});

/* ==========================================================
   📊 ADMIN DASHBOARD STATS
   Route → GET /api/admin/stats
   Shows key overview metrics
   ========================================================== */
router.get("/stats", protect, requireRole("admin"), async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalCourses = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();
    const totalDemoBookings = await DemoBooking.countDocuments().catch(() => 0);

    // Optional: trend data for chart (last 6 months)
    const monthlyEnrollments = await Enrollment.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    // Optional: recent activity for admin dashboard
    const recentEnrollments = await Enrollment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("courseId", "title")
      .populate("userId", "name email");

    res.status(200).json({
      success: true,
      data: {
        totals: {
          totalStudents,
          totalCourses,
          totalEnrollments,
          totalDemoBookings,
        },
        recentEnrollments,
        monthlyEnrollments,
      },
    });
  } catch (error) {
    console.error("❌ Admin Stats Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to load admin stats" });
  }
});

export default router;
