import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleAuth.js";

const router = express.Router();

/* ==========================================================
   🔐 AUTH ROUTES
   Base URL → /api/auth
   ========================================================== */

// 🧾 Helper: Generate JWT Token
const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

/* ==========================================================
   🧍 STUDENT SIGNUP (default role)
   Route: POST /api/auth/signup
   ========================================================== */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in.",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role?.toLowerCase() === "admin" ? "admin" : "student",
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful 🎉",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Signup Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error during signup." });
  }
});

/* ==========================================================
   🔑 UNIVERSAL SIGNIN (Student or Admin)
   Route: POST /api/auth/signin
   ========================================================== */
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found. Please sign up first.",
      });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Signin successful ✅",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Signin Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error during signin." });
  }
});

/* ==========================================================
   🛡️ ADMIN SIGNIN (Dedicated route)
   Route: POST /api/auth/admin-login
   ========================================================== */
router.post("/admin-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });

    const admin = await User.findOne({ email, role: "admin" }).select("+password");
    if (!admin)
      return res
        .status(404)
        .json({ success: false, message: "Admin account not found" });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });

    const token = generateToken(admin);

    return res.status(200).json({
      success: true,
      message: "Admin login successful ✅",
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("❌ Admin Login Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error during admin login." });
  }
});

/* ==========================================================
   🧑‍💼 CREATE ADMIN (Protected)
   Route: POST /api/auth/create-admin
   Access: Admin Only
   ========================================================== */
router.post("/create-admin", protect, requireRole("admin"), async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res
        .status(400)
        .json({ success: false, message: "Admin already exists" });

    const admin = await User.create({ name, email, password, role: "admin" });

    return res.status(201).json({
      success: true,
      message: "New admin created successfully 🎉",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("❌ Create Admin Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error while creating admin." });
  }
});

export default router;
