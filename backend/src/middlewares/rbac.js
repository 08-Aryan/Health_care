/**
 * RBAC Middleware
 * Usage: rbac("patient"), rbac("provider")
 */

const rbac = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user?.role;

      if (!userRole) {
        return res.status(403).json({ message: "Forbidden: No role found" });
      }

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }

      next();
    } catch (error) {
      console.error("RBAC Error:", error.message);
      return res.status(403).json({ message: "Forbidden: Role error" });
    }
  };
};

export default rbac;
