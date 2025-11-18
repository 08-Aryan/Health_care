import axios from "axios";
import { getToken } from "../utils/storage";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/";

const handleError = (error) => {
  if (error.response) {
    throw error;
  } else if (error.request) {
    throw new Error(
      "No response from server. Please check if the backend is running."
    );
  } else {
    throw error;
  }
};

export const authApi = {
  /**
   * Register new user
   */
  register: async (data) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, data);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Login user
   */
  login: async (data) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, data);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Get logged-in user info (/me endpoint)
   */
  me: async () => {
    try {
      const token = getToken();
      const res = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
};
