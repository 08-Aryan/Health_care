import Goal from "../models/Goal.js";

// ADD goal
export const addGoal = async (req, res) => {
  try {
    const { steps, waterIntake, sleepHours } = req.body;

    if (!steps && !waterIntake && !sleepHours) {
      return res
        .status(400)
        .json({ success: false, message: "Goal data required" });
    }

    const goal = await Goal.create({
      patientId: req.user.id,
      steps,
      waterIntake,
      sleepHours,
    });

    return res.status(201).json({ success: true, goal });
  } catch (err) {
    console.error("Add goal error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET patient’s own goals
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ patientId: req.user.id }).sort({
      createdAt: -1,
    });

    return res.json({ success: true, goals });
  } catch (err) {
    console.error("Get goals error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET goals by patientId (provider use)
export const getGoalsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    const goals = await Goal.find({ patientId }).sort({ createdAt: -1 });

    return res.json({ success: true, goals });
  } catch (err) {
    console.error("Provider patient goals error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
