import User from "../models/User.js";
import Goal from "../models/Goal.js";

// GET all patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" }).select("-password");

    // Calculate compliance for each patient
    const patientsWithCompliance = await Promise.all(
      patients.map(async (patient) => {
        const goals = await Goal.find({ patientId: patient._id });
        
        if (goals.length === 0) {
          return {
            ...patient.toObject(),
            compliance: 0,
            goalsCount: 0,
          };
        }

        // Calculate compliance percentage
        let totalCompliance = 0;
        goals.forEach((goal) => {
          if (goal.steps && goal.steps > 0) totalCompliance += 1;
          if (goal.waterIntake && goal.waterIntake > 0) totalCompliance += 1;
          if (goal.sleepHours && goal.sleepHours > 0) totalCompliance += 1;
        });

        const compliance = Math.round((totalCompliance / (goals.length * 3)) * 100);

        return {
          ...patient.toObject(),
          compliance,
          goalsCount: goals.length,
        };
      })
    );

    return res.json({
      success: true,
      patients: patientsWithCompliance,
    });
  } catch (err) {
    console.error("Get patients error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET patient progress
export const getPatientProgress = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await User.findById(id).select("-password");
    if (!patient || patient.role !== "patient") {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    const goals = await Goal.find({ patientId: id }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      patient,
      goals,
    });
  } catch (err) {
    console.error("Get patient progress error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
