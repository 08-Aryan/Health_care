import { useState } from "react";
import { authApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    allergies: "",
    medications: "",
    consentGiven: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.consentGiven) {
      return setError("You must agree to data usage & privacy consent.");
    }

    try {
      const payload = {
        ...form,
        allergies: form.allergies ? form.allergies.split(",") : [],
        medications: form.medications ? form.medications.split(",") : [],
      };

      await authApi.register(payload);

      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-600 p-2 rounded mb-4 text-center">
            {success}
          </div>
        )}

        {/* Name */}
        <label className="block mb-3">
          <span className="text-gray-700">Full Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </label>

        {/* Email */}
        <label className="block mb-3">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </label>

        {/* Password */}
        <label className="block mb-3">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </label>

        {/* Role Selection */}
        <label className="block mb-3">
          <span className="text-gray-700">Role</span>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="patient">Patient</option>
            <option value="provider">Healthcare Provider</option>
          </select>
        </label>

        {/* Patient-only Health Info */}
        {form.role === "patient" && (
          <>
            <label className="block mb-3">
              <span className="text-gray-700">Allergies (comma separated)</span>
              <input
                type="text"
                name="allergies"
                value={form.allergies}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </label>

            <label className="block mb-3">
              <span className="text-gray-700">Medications (comma separated)</span>
              <input
                type="text"
                name="medications"
                value={form.medications}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </label>
          </>
        )}

        {/* Consent */}
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            name="consentGiven"
            checked={form.consentGiven}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span className="text-gray-700 text-sm">
            I agree to the privacy policy and data usage terms.
          </span>
        </label>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          Register
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-medium">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
