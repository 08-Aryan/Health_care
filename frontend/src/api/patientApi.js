// frontend/src/api/patientApi.js

const BASE_URL = "/api/patient"; // proxy through Vite or CRA

export const getDashboard = async () => {
  try {
    const res = await fetch(`${BASE_URL}/dashboard`, {
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Error fetching dashboard:", err);
    return { success: false };
  }
};

export const getProfile = async () => {
  try {
    const res = await fetch(`${BASE_URL}/profile`, {
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Error fetching profile:", err);
    return { success: false };
  }
};

export const updateProfile = async (profileData) => {
  try {
    const res = await fetch(`${BASE_URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(profileData),
    });
    return await res.json();
  } catch (err) {
    console.error("Error updating profile:", err);
    return { success: false };
  }
};
