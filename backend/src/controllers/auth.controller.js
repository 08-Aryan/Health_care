import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

/**
 * @desc Register new user (patient or provider)
 * @route POST /api/auth/register
 */
export const register = async (req, res) => {
  try {
    const { name, email, password, role, allergies, medications, consentGiven } = req.body;

    // Required fields
    if (!name || !email || !password || !role || consentGiven === undefined) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Check role validity
    if (!["patient", "provider"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash password
    const hashed = await hashPassword(password);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      allergies: allergies || [],
      medications: medications || [],
      consentGiven,
    });

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    return res.status(500).json({ message: "Server error during registration" });
  }
};

/**
 * @desc Login
 * @route POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken({
      id: user._id,
      role: user.role,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ message: "Server error during login" });
  }
};
