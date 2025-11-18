import express from "express";
import {
  getAllPatients,
  getPatientProgress,
} from "../controllers/provider.controller.js";
import auth from "../middlewares/auth.js";
import rbac from "../middlewares/rbac.js";

const router = express.Router();

// Get all patients
router.get("/patients", auth, rbac("provider"), getAllPatients);

// Get patient progress
router.get("/patients/:id/progress", auth, rbac("provider"), getPatientProgress);

export default router;