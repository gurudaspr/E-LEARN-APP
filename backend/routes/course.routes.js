import express from "express"
import { addCourse, viewCourse } from "../controllers/course.controllers.js";
const router = express.Router();


router.post('/add-course', addCourse)
router.get('/view-course',viewCourse)
export default router;