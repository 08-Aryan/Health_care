import { useState, useEffect } from "react";

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    allergies: "",
    medications: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("/api/patient/profile", {
          credentials: "include",
        });
        const data = await res.json();
        setForm(data);
      } catch (err) {
        console.log("Profile fetch error:", err);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    try {
      await fetch("/api/patient/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      alert("Profile updated!");
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="space-y-4 bg-white p-6 rounded-xl shadow">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          placeholder="Full Name"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          placeholder="Email"
        />

        <textarea
          name="allergies"
          value={form.allergies}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          placeholder="Allergies"
        />

        <textarea
          name="medications"
          value={form.medications}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          placeholder="Current Medications"
        />

        <button
          onClick={saveProfile}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
