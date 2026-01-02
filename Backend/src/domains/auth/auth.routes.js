import express from "express";
import { login, signup } from "./auth.controller.js";

const router = express.Router();

// 🚨 NEVER protect auth routes
router.post("/login", login);
router.post("/signup", signup);

export default router;
