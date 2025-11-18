import { useState, useEffect } from "react";
import { getGoals, createGoal, deleteGoal } from "../api/goalApi";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    steps: "",
    waterIntake: "",
    sleepHours: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const res = await getGoals();
      setGoals(res.goals || []);
    } catch (err) {
      setError("Failed to load goals");
      console.error("Goals fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value ? parseInt(value) : "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.steps && !form.waterIntake && !form.sleepHours) {
      setError("Please set at least one goal");
      return;
    }

    try {
      const res = await createGoal(form);
      if (res.success) {
        setSuccess("Goal created successfully!");
        setForm({ steps: "", waterIntake: "", sleepHours: "" });
        setShowForm(false);
        fetchGoals();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create goal");
      console.error("Create goal error:", err);
    }
  };

  const handleDelete = async (goalId) => {
    if (window.confirm("Delete this goal?")) {
      try {
        const res = await deleteGoal(goalId);
        if (res.success) {
          setSuccess("Goal deleted!");
          fetchGoals();
        }
      } catch (err) {
        setError("Failed to delete goal");
        console.error("Delete goal error:", err);
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Wellness Goals</h1>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 text-green-600 p-3 rounded-lg mb-4">
          {success}
        </div>
      )}

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mb-6"
        >
          + Add New Goal
        </button>
      )}

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Create New Goal</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Steps Target
              </label>
              <input
                type="number"
                name="steps"
                value={form.steps}
                onChange={handleChange}
                placeholder="e.g., 5000"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Water Intake (liters)
              </label>
              <input
                type="number"
                name="waterIntake"
                value={form.waterIntake}
                onChange={handleChange}
                placeholder="e.g., 2"
                step="0.5"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sleep Hours Target
              </label>
              <input
                type="number"
                name="sleepHours"
                value={form.sleepHours}
                onChange={handleChange}
                placeholder="e.g., 7"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
              >
                Save Goal
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setForm({ steps: "", waterIntake: "", sleepHours: "" });
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading goals...</div>
      ) : goals.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-xl text-center text-gray-600">
          <p className="text-lg">No goals yet. Create one to get started! 🎯</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((goal) => (
            <div key={goal._id} className="bg-white p-6 rounded-xl shadow border border-gray-200 hover:shadow-lg transition">
              <div className="space-y-3">
                {goal.steps > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Daily Steps</span>
                    <span className="text-2xl font-bold text-blue-600">{goal.steps}</span>
                  </div>
                )}
                {goal.waterIntake > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Water Intake</span>
                    <span className="text-2xl font-bold text-blue-600">{goal.waterIntake}L</span>
                  </div>
                )}
                {goal.sleepHours > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Sleep Hours</span>
                    <span className="text-2xl font-bold text-blue-600">{goal.sleepHours}h</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Created {new Date(goal.createdAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleDelete(goal._id)}
                className="mt-4 w-full bg-red-100 hover:bg-red-200 text-red-600 py-2 rounded-lg font-medium transition"
              >
                Delete Goal
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
