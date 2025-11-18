import express from "express";
import { getPublicArticles } from "../controllers/public.controller.js";

const router = express.Router();

// Public articles (no login required)
router.get("/articles", getPublicArticles);

export default router;
