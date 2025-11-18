import User from "../models/User.js";
import Goal from "../models/Goal.js";

/**
 * @desc Get all patients assigned to this provider
 * @route GET /api/provider/patients
 * @access Provider only
 */
export const getAssignedPatients = async (req, res) => {
  try {
    // Assuming provider stores assigned patient IDs in DB
    // Or you could filter users by some provider field
    const patients = await User.find({ role: "patient" }).select(
      "_id name email allergies medications"
    );

    return res.status(200).json({ patients });
  } catch (error) {
    console.error("Get Patients Error:", error.message);
    return res.status(500).json({ message: "Server error fetching patients" });
  }
};

/**
 * @desc Get a specific patient's goals and compliance
 * @route GET /api/provider/patients/:patientId
 * @access Provider only
 */
export const getPatientDetails = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await User.findById(patientId).select(
      "_id name email allergies medications"
    );

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const goals = await Goal.find({ patient: patientId });

    const compliance = goals.map((g) => ({
      goalId: g._id,
      title: g.title,
      status: g.completed ? "Goal Met" : "Missed Preventive Checkup",
    }));

    return res.status(200).json({ patient, compliance });
  } catch (error) {
    console.error("Get Patient Details Error:", error.message);
    return res.status(500).json({ message: "Server error fetching patient details" });
  }
};
