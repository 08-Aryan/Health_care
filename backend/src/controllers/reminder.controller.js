import Reminder from "../models/Reminder.js";

// CREATE reminder
export const createReminder = async (req, res) => {
  try {
    const { title, date, description } = req.body;

    if (!title || !date) {
      return res.status(400).json({ 
        success: false, 
        message: "Title and date are required" 
      });
    }

    const reminder = await Reminder.create({
      patientId: req.user.id,
      title,
      date,
      description,
    });

    return res.status(201).json({ success: true, reminder });
  } catch (err) {
    console.error("Create reminder error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET reminders for logged-in patient
export const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ patientId: req.user.id })
      .sort({ date: 1 });

    return res.json({ success: true, reminders });
  } catch (err) {
    console.error("Get reminders error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE reminder
export const deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;

    const reminder = await Reminder.findOne({ 
      _id: id, 
      patientId: req.user.id 
    });

    if (!reminder) {
      return res.status(404).json({ 
        success: false, 
        message: "Reminder not found" 
      });
    }

    await Reminder.findByIdAndDelete(id);

    return res.json({ 
      success: true, 
      message: "Reminder deleted successfully" 
    });
  } catch (err) {
    console.error("Delete reminder error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
