// frontend/src/api/goalApi.js

const BASE_URL = "/api/goals"; // proxy through Vite or CRA

export const getGoals = async () => {
  try {
    const res = await fetch(BASE_URL, { credentials: "include" });
    return await res.json();
  } catch (err) {
    console.error("Error fetching goals:", err);
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
    return await res.json();
  } catch (err) {
    console.error("Error creating goal:", err);
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
    return await res.json();
  } catch (err) {
    console.error("Error updating goal:", err);
    return { success: false };
  }
};

export const deleteGoal = async (goalId) => {
  try {
    const res = await fetch(`${BASE_URL}/${goalId}`, {
      method: "DELETE",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Error deleting goal:", err);
    return { success: false };
  }
};

