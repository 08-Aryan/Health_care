import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    repeat: {
      type: String,
      enum: ["daily", "weekly", "monthly", "once"],
      default: "once",
    },
  },
  { timestamps: true }
);

const Reminder = mongoose.model("Reminder", ReminderSchema);

export default Reminder;
