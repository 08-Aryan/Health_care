import express from "express";
import {
  getDashboard,
  getProfile,
  updateProfile
} from "../controllers/patient.controller.js";

import auth from "../middlewares/auth.js";
import rbac from "../middlewares/rbac.js";

const router = express.Router();

// Patient Dashboard
router.get("/dashboard", auth, rbac("patient"), getDashboard);

// Patient Profile
router.route("/profile")
  .get(auth, rbac("patient"), getProfile)
  .put(auth, rbac("patient"), updateProfile);

export default router;
