import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="w-full bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-bold text-green-600">Wellness Portal</Link>
        <Link to="/public/health" className="text-sm text-gray-600">Resources</Link>
        <Link to="/privacy-policy" className="text-sm text-gray-600">Privacy</Link>
      </div>

      <div>
        {!user ? (
          <div className="flex gap-3">
            <Link to="/login" className="text-sm text-blue-600">Login</Link>
            <Link to="/register" className="text-sm text-green-600">Register</Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">{user.name}</span>
            <button onClick={logout} className="text-sm text-red-600">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
