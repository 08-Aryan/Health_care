import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { getToken, setToken, clearToken } from "../utils/storage";
import { authApi } from "../api/authApi";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const token = getToken();
      if (!token) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const res = await authApi.me();
        if (isMounted) setUser(res.user);
      } catch (err) {
        console.error("AuthContext error:", err);
        clearToken();
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    init();

    // Cleanup to avoid memory leaks
    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    setToken(res.token);
    setUser(res.user);
    return res;
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
