import express from "express"
import { addCourse, viewCourse,  deleteCoursebyId, viewCoursebyId,editCoursebyId } from "../controllers/course.controllers.js";
const router = express.Router();
import { verifyToken } from "../utils/jwtVerify.js";
import upload from "../middlewares/upload.middleware.js";





router.post('/add-course',upload.single('image'), addCourse)
router.get('/view-course',viewCourse)
router.get('/view-course/:id',verifyToken,viewCoursebyId)
router.put('/edit/:id',upload.single('image') ,verifyToken,editCoursebyId)
router.delete('/view-course/:id',verifyToken,deleteCoursebyId)

export default router;