import express from "express";
import { addFeedback, listFeedback } from "./feedback.controller.js";
import { requireAuth } from "../../core/security/auth.middleware.js";

const router = express.Router();

router.get("/", requireAuth, listFeedback);
router.post("/", requireAuth, addFeedback);

export default router;
