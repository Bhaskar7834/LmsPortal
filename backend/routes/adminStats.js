import express from "express";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Admin stats route
router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    // --- 1️⃣ Basic Counts ---
    const [students, courses, enrollments] = await Promise.all([
      User.countDocuments({ role: "student" }),
      Course.countDocuments(),
      Enrollment.countDocuments(),
    ]);

    // --- 2️⃣ Popular Courses ---
    // Aggregate top 5 courses with most enrollments
    const popular = await Enrollment.aggregate([
      { $group: { _id: "$courseId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "courses",
          localField: "_id",
          foreignField: "_id",
          as: "course",
        },
      },
      { $unwind: "$course" },
      {
        $project: {
          title: "$course.title",
          enrollmentCount: "$count",
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: { students, courses, enrollments },
      popularCourses: popular,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin stats",
    });
  }
});

export default router;
