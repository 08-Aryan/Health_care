import express from "express";
import {
  createReminder,
  getReminders,
  deleteReminder,
} from "../controllers/reminder.controller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Create a new reminder
router.post("/", auth, createReminder);

// Get reminders for logged-in patient
router.get("/", auth, getReminders);

// Delete a reminder
router.delete("/:id", auth, deleteReminder);

export default router;
