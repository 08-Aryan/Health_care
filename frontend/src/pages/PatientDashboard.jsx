import { useEffect, useState } from "react";

export default function PatientDashboard() {
  const [stats, setStats] = useState({});
  const [reminders, setReminders] = useState([]);
  const [tip, setTip] = useState("");

  useEffect(() => {
    // Fetch dashboard data
    const fetchData = async () => {
      try {
        const res = await fetch("/api/patient/dashboard", {
          credentials: "include",
        });
        const data = await res.json();
        setStats(data.stats || {});
        setReminders(data.reminders || []);
        setTip(data.tip || "Stay healthy 💪");
      } catch (err) {
        console.log("Dashboard fetch error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Your Dashboard</h1>

      {/* STATS CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded-xl">
          <h3 className="font-semibold text-gray-700">Steps Today</h3>
          <p className="text-2xl font-bold">{stats.steps || 0}</p>
        </div>

        <div className="p-4 bg-white shadow rounded-xl">
          <h3 className="font-semibold text-gray-700">Sleep</h3>
          <p className="text-2xl font-bold">{stats.sleep || 0} hrs</p>
        </div>

        <div className="p-4 bg-white shadow rounded-xl">
          <h3 className="font-semibold text-gray-700">Water Intake</h3>
          <p className="text-2xl font-bold">{stats.water || 0} glasses</p>
        </div>
      </div>

      {/* REMINDERS */}
      <div className="bg-white p-4 shadow rounded-xl mb-6">
        <h2 className="text-xl font-semibold mb-3">Preventive Reminders</h2>
        {reminders.length === 0 ? (
          <p className="text-gray-500">No reminders right now 😎</p>
        ) : (
          <ul className="space-y-2">
            {reminders.map((r, idx) => (
              <li key={idx} className="p-3 bg-gray-100 rounded-lg">
                {r}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* HEALTH TIP */}
      <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-1">Health Tip of the Day</h2>
        <p className="text-gray-700">{tip}</p>
      </div>
    </div>
  );
}
