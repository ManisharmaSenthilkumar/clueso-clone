import express from "express";
import {
  getInsights,
  generateInsightsFromFeedback,
} from "./insights.controller.js";

import { requireAuth } from "../../core/security/auth.middleware.js";

const router = express.Router();

router.get("/", requireAuth, getInsights);
router.post("/generate", requireAuth, generateInsightsFromFeedback);

export default router;
