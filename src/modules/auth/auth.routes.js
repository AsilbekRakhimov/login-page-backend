import { Router } from "express";
import authController from "./auth.controller.js";
const router = Router();

// login
router.post("/log-in", authController.logIN);

// sign in
router.post("/sign-in", authController.singIN);

// sign new tokens
router.post("/refresh-access-token", authController.signRefreshTokenNew);

export default router