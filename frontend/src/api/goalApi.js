// frontend/src/api/goalApi.js

const BASE_URL = "/api/goals"; // proxy through Vite or CRA

const handleError = (err, defaultMessage) => {
  console.error(`${defaultMessage}:`, err);
  throw err;
};

export const getGoals = async () => {
  try {
    const res = await fetch(BASE_URL, { credentials: "include" });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    handleError(err, "Error fetching goals");
    return { success: false };
  }
};

export const createGoal = async (goalData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(goalData),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    handleError(err, "Error creating goal");
    return { success: false };
  }
};

export const updateGoal = async (goalId, goalData) => {
  try {
    const res = await fetch(`${BASE_URL}/${goalId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(goalData),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    handleError(err, "Error updating goal");
    return { success: false };
  }
};

export const deleteGoal = async (goalId) => {
  try {
    const res = await fetch(`${BASE_URL}/${goalId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    handleError(err, "Error deleting goal");
    return { success: false };
  }
};
