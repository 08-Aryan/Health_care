import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * Protects pages from unauthorized access
 * Usage:
 * <ProtectedRoute>
 *    <Dashboard />
 * </ProtectedRoute>
 */
const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useContext(AuthContext);

  // Still checking token → show a loading screen
  if (loading) return <div className="p-4 text-center">Loading...</div>;

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Role-based access (optional)
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // All checks passed
  return children;
};

export default ProtectedRoute;
