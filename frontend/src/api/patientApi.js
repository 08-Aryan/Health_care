// frontend/src/api/patientApi.js

const BASE_URL = "/api/patient"; // proxy through Vite or CRA

const handleError = (err, defaultMessage) => {
  console.error(`${defaultMessage}:`, err);
  throw err;
};

export const getDashboard = async () => {
  try {
    const res = await fetch(`${BASE_URL}/dashboard`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    handleError(err, "Error fetching dashboard");
    return { success: false };
  }
};

export const getProfile = async () => {
  try {
    const res = await fetch(`${BASE_URL}/profile`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    handleError(err, "Error fetching profile");
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
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    handleError(err, "Error updating profile");
    return { success: false };
  }
};
