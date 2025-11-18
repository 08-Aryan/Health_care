import Reminder from "../models/Reminder.js";

/**
 * Get all reminders for a specific patient
 * @route GET /api/reminders
 * @access Private (patient)
 */
export const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ patient: req.user._id }).sort({ date: 1 });
    res.status(200).json(reminders);
  } catch (err) {
    console.error("Get Reminders Error:", err.message);
    res.status(500).json({ message: "Server error fetching reminders" });
  }
};

/**
 * Create a new reminder
 * @route POST /api/reminders
 * @access Private (patient)
 */
export const createReminder = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: "Title and date are required" });
    }

    const reminder = await Reminder.create({
      patient: req.user._id,
      title,
      description,
      date,
    });

    res.status(201).json(reminder);
  } catch (err) {
    console.error("Create Reminder Error:", err.message);
    res.status(500).json({ message: "Server error creating reminder" });
  }
};

/**
 * Update a reminder
 * @route PUT /api/reminders/:id
 * @access Private (patient)
 */
export const updateReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOne({ _id: req.params.id, patient: req.user._id });

    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    Object.assign(reminder, req.body);
    await reminder.save();

    res.status(200).json(reminder);
  } catch (err) {
    console.error("Update Reminder Error:", err.message);
    res.status(500).json({ message: "Server error updating reminder" });
  }
};

/**
 * Delete a reminder
 * @route DELETE /api/reminders/:id
 * @access Private (patient)
 */
export const deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndDelete({ _id: req.params.id, patient: req.user._id });

    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (err) {
    console.error("Delete Reminder Error:", err.message);
    res.status(500).json({ message: "Server error deleting reminder" });
  }
};
