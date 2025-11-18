import ActivityLog from "../models/ActivityLog.js";

/**
 * Activity Logger
 * Logs user interactions for auditing & analytics.
 *
 * Should be placed AFTER `auth` middleware in protected routes.
 */
const activityLogger = async (req, res, next) => {
  try {
    // Only log actions where a verified user exists
    if (!req.user) return next();

    await ActivityLog.create({
      user: req.user._id,
      action: req.action || "UNKNOWN_ACTION",
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      meta: req.meta || {}
    });

    next();
  } catch (error) {
    console.error("Activity Log Error:", error.message);
    // Don't block user if logging fails
    next();
  }
};

export default activityLogger;
