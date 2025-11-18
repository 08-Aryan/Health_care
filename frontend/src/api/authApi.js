import axios from "axios";
import { getToken } from "../utils/storage";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const authApi = {
  /**
   * Register new user
   */
  register: async (data) => {
    const res = await axios.post(`${API_URL}/auth/register`, data);
    return res.data;
  },

  /**
   * Login user
   */
  login: async (data) => {
    const res = await axios.post(`${API_URL}/auth/login`, data);
    return res.data;
  },

  /**
   * Get logged-in user info (/me endpoint)
   */
  me: async () => {
    const token = getToken();
    const res = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
};
