import express from "express";
import { enrollCourse ,viewEnrollCourse} from "../controllers/enroll.controller.js";

import { verifyToken } from "../utils/jwtVerify.js";
const router = express.Router();

router.post('/enroll-course', verifyToken, enrollCourse);
router.post('/view-enroll-course', verifyToken, viewEnrollCourse);

export default router;
