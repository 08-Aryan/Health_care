import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { getGoals, createGoal, updateGoal, deleteGoal } from "../api/goalsApi";
import { useAuth } from "../context/AuthContext";

const Goals = () => {
  const { token } = useAuth();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newGoal, setNewGoal] = useState({ type: "", target: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch goals on mount
  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const data = await getGoals(token);
      setGoals(data);
    } catch (err) {
      console.error("Error fetching goals:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async () => {
    if (!newGoal.type || !newGoal.target) return;
    try {
      await createGoal(newGoal, token);
      setNewGoal({ type: "", target: "" });
      fetchGoals();
    } catch (err) {
      console.error("Error creating goal:", err);
    }
  };

  const handleUpdateGoal = async (id) => {
    const goalToUpdate = goals.find((g) => g._id === id);
    if (!goalToUpdate) return;
    try {
      await updateGoal(id, goalToUpdate, token);
      setEditingId(null);
      fetchGoals();
    } catch (err) {
      console.error("Error updating goal:", err);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await deleteGoal(id, token);
      fetchGoals();
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };

  const handleEditChange = (id, field, value) => {
    setGoals((prev) =>
      prev.map((g) => (g._id === id ? { ...g, [field]: value } : g))
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Goals</h1>

      {/* Add new goal */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Goal Type (e.g., Steps)"
          value={newGoal.type}
          onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value })}
          className="border rounded p-2 flex-1"
        />
        <input
          type="text"
          placeholder="Target (e.g., 10000)"
          value={newGoal.target}
          onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
          className="border rounded p-2 w-32"
        />
        <button
          onClick={handleAddGoal}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 hover:bg-blue-700"
        >
          <FaPlus /> Add
        </button>
      </div>

      {/* Goals list */}
      {loading ? (
        <p>Loading goals...</p>
      ) : goals.length === 0 ? (
        <p>No goals added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <div
              key={goal._id}
              className="border rounded p-4 shadow hover:shadow-lg transition"
            >
              {editingId === goal._id ? (
                <>
                  <input
                    type="text"
                    value={goal.type}
                    onChange={(e) =>
                      handleEditChange(goal._id, "type", e.target.value)
                    }
                    className="border p-1 w-full mb-2"
                  />
                  <input
                    type="text"
                    value={goal.target}
                    onChange={(e) =>
                      handleEditChange(goal._id, "target", e.target.value)
                    }
                    className="border p-1 w-full mb-2"
                  />
                  <button
                    onClick={() => handleUpdateGoal(goal._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold">{goal.type}</h2>
                  <p>Target: {goal.target}</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => setEditingId(goal._id)}
                      className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 flex items-center gap-1"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteGoal(goal._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Goals;
