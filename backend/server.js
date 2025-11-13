// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// === Load Environment Variables ===
dotenv.config();

// === Connect to MongoDB ===
await connectDB();

// === Initialize Express App ===
const app = express();

// === Core Middleware ===
app.use(express.json({ limit: "50mb" })); // Handle large uploads safely

// === CORS Configuration ===
const allowedOrigin = process.env.CLIENT_URL || "http://localhost:5175";

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === allowedOrigin) callback(null, true);
      else {
        console.warn("🚫 CORS blocked for origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

// === Import Middleware ===
// === Import Middleware ===
import { protect, adminOnly } from "./middleware/authMiddleware.js";
import { requireRole } from "./middleware/roleAuth.js";

// === Import Routes ===
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminStatsRoutes from "./routes/adminStats.js";
import progressRoutes from "./routes/ProgressRoutes.js"; // ✅ new progress route

// === ROUTES ===

// 🔑 Authentication Routes
app.use("/api/auth", authRoutes);

// 📚 Public Course Routes
app.use("/api/courses", courseRoutes);

// 🎓 Student Enrollment Routes (Protected)
app.use("/api/enrollments", protect, enrollmentRoutes);

// 🧩 Student Progress Tracking (Protected)
app.use("/api/enrollments", protect, progressRoutes); // ✅ added here

// 🧑‍💼 Admin Core Routes (Protected + Admin Only)
app.use("/api/admin", protect, adminOnly, adminRoutes);

// 📊 Admin Stats (Analytics Dashboard)
app.use("/api/admin", protect, adminOnly, adminStatsRoutes);

// 🩺 Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ LMS Backend is running successfully",
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0",
  });
});

// ⚠️ Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack || err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// === Start Server ===
const PORT = process.env.PORT || 4000;
const MODE = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
  console.log(`
🚀 ============================================
✅ LMS Backend Server is LIVE
🌐 URL: http://localhost:${PORT}
🧭 Mode: ${MODE.toUpperCase()}
💾 MongoDB: Connected Successfully
🎯 Allowed Origin: ${allowedOrigin}
===============================================
`);
});
