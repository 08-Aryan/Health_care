import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register new user
 * @access Public
 */
router.post("/register", register);

/**
 * @route POST /api/auth/login
 * @desc Login user
 * @access Public
 */
router.post("/login", login);

/**
 * @route GET /api/auth/me
 * @desc Get logged in user info
 * @access Private
 */
router.get("/me", auth, (req, res) => {
  res.json({
    user: req.user,
  });
});

export default router;
