import express, { Router } from "express"
import { login, logout,checkEmailExists,sendOtp,verifyOtp } from "../controllers/auth.controllers.js";

const router = express.Router();


// router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.post('/check-email',checkEmailExists)
router.post('/send-otp',sendOtp)
router.post('/verify-otp',verifyOtp)

export default router;