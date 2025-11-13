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

// === Middleware ===
app.use(express.json({ limit: "50mb" }));

// ================================================
//        ⭐ UNIVERSAL CORS SETUP (FINAL FIX) ⭐
//   Allows:  
//     ✔ Your Render frontend  
//     ✔ All localhost ports automatically  
// ================================================

const allowedOrigins = [
  process.env.CLIENT_URL,
  "https://lmsportal-frontend.onrender.com",   // your deployed frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow mobile apps, etc.

      // Allow all localhost ports automatically
      if (
        allowedOrigins.includes(origin) ||
        origin.startsWith("http://localhost") ||
        origin.startsWith("http://127.0.0.1")
      ) {
        return callback(null, true);
      }

      console.warn("🚫 CORS BLOCKED:", origin);
      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// ================================================
//                  IMPORT ROUTES
// ================================================

import { protect, adminOnly } from "./middleware/authMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminStatsRoutes from "./routes/adminStats.js";
import progressRoutes from "./routes/ProgressRoutes.js";

// ================================================
//                      ROUTES
// ================================================

// Auth
app.use("/api/auth", authRoutes);

// Course public routes
app.use("/api/courses", courseRoutes);

// Student enrollments
app.use("/api/enrollments", protect, enrollmentRoutes);
app.use("/api/enrollments", protect, progressRoutes);

// Admin routes (protected)
app.use("/api/admin", protect, adminOnly, adminRoutes);
app.use("/api/admin", protect, adminOnly, adminStatsRoutes);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ LMS Backend is running successfully",
    environment: process.env.NODE_ENV,
    version: "1.0.0",
  });
});

// ================================================
//                GLOBAL ERROR HANDLER
// ================================================

app.use((err, req, res, next) => {
  console.error("❌ SERVER ERROR:", err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ================================================
//                START SERVER
// ================================================
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`
🚀 ============================================
   LMS Backend is LIVE on port ${PORT}
💾 MongoDB: Connected
🌐 Allowed Origins:
${allowedOrigins.join("\n")}
🖥  Localhost: ALL PORTS allowed
===============================================
`);
});
