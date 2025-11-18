// src/controllers/patient.controller.js

const User = require("../models/User");
const Goal = require("../models/Goal");
const Reminder = require("../models/Reminder");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    const goals = await Goal.find({ patientId: userId })
      .sort({ createdAt: -1 })
      .limit(7);

    const reminders = await Reminder.find({ patientId: userId })
      .sort({ date: 1 })
      .limit(5);

    const healthTips = [
      "Drink at least 2L of water today.",
      "Take a short walk to refresh your mind.",
      "Get 7-8 hours of sleep for better recovery.",
      "Include a fruit in your next meal.",
    ];

    const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];

    return res.json({
      success: true,
      user,
      goals,
      reminders,
      healthTip: randomTip,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json({ success: true, profile: user });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const allowedFields = ["name", "allergies", "medications", "age", "gender"];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field]) updates[field] = req.body[field];
    });

    const updated = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");

    return res.json({ success: true, updated });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
