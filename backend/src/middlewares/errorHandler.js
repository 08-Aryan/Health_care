/**
 * Global Error Handler
 * Captures errors thrown anywhere in the app and returns a safe JSON response.
 */
const errorHandler = (err, req, res, next) => {
  console.error("🔥 Global Error:", err);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
