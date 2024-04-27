import express from "express";
import { enrollCourse ,viewEnrollCourse} from "../controllers/enroll.controller.js";
const router = express.Router();

router.post('/enroll-course', enrollCourse);
router.post('/view-enroll-course', viewEnrollCourse);

export default router;
