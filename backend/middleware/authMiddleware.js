import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * =============================================================
 * 🔒 Middleware: protect
 * -------------------------------------------------------------
 * Verifies JWT from Authorization header or cookies,
 * fetches user from DB, and attaches to req.user.
 * =============================================================
 */
export const protect = async (req, res, next) => {
  try {
    let token;

    // ✅ Extract token (Supports Bearer & Cookie)
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No authentication token provided.",
      });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Fetch user (without password)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found or account no longer exists.",
      });
    }

    // ✅ Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("❌ Auth Middleware Error:", error.message);

    const isExpired = error.name === "TokenExpiredError";
    return res.status(401).json({
      success: false,
      message: isExpired
        ? "Session expired. Please log in again."
        : "Invalid or expired token.",
    });
  }
};

/**
 * =============================================================
 * 🛡️ Middleware: adminOnly
 * -------------------------------------------------------------
 * Ensures that the logged-in user is an Admin.
 * Should always be used *after* protect().
 * =============================================================
 */
export const adminOnly = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. No user found in request.",
      });
    }

    if (req.user.role !== "admin") {
      console.warn(`🚫 Access denied. Role '${req.user.role}' attempted admin route.`);
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    next();
  } catch (error) {
    console.error("❌ Admin Middleware Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while verifying admin access.",
    });
  }
};

