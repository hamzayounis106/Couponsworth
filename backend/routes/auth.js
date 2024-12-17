import express from "express";
import {
  forgotPassword,
  login,
  refreshToken,
  register,
  resetPassword,
  verifyOtp,
} from "../controllers/authController.js";

const router = express.Router();

// Define routes
router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/refresh-token", refreshToken);

export default router;
