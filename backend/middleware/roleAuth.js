/**
 * =============================================================
 * 🧩 Middleware: requireRole
 * -------------------------------------------------------------
 * Ensures that only users with a specific role can access a route.
 * Must be used after the `protect` middleware.
 *
 * Example usage:
 * router.get("/admin", protect, requireRole("admin"), controller);
 * router.get("/teacher", protect, requireRole("teacher"), controller);
 * =============================================================
 */
export const requireRole = (role) => {
  return (req, res, next) => {
    try {
      // Ensure user exists (must come from protect middleware)
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: No user context found.",
        });
      }

      // Check user role
      if (req.user.role !== role) {
        console.warn(
          `🚫 Access denied. User '${req.user.name || req.user.email}' tried to access a ${role}-only route.`
        );
        return res.status(403).json({
          success: false,
          message: `Access denied: Only ${role}s are allowed.`,
        });
      }

      // ✅ Access granted
      next();
    } catch (error) {
      console.error("❌ Role Authorization Error:", error.message);
      res.status(500).json({
        success: false,
        message: "Internal server error during role verification.",
      });
    }
  };
};
