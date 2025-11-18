import express from "express";
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
} from "../controllers/patient.controller.js";

import auth from "../middlewares/auth.js";

const router = express.Router();

// Protected Patient Routes
router.route("/")
  .post(auth, createPatient)
  .get(auth, getAllPatients);

router.route("/:id")
  .get(auth, getPatientById)
  .put(auth, updatePatient)
  .delete(auth, deletePatient);

export default router;
