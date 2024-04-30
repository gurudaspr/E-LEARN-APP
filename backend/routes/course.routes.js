import express from "express"
import { addCourse, viewCourse,  deleteCoursebyId, viewCoursebyId,editCoursebyId } from "../controllers/course.controllers.js";
const router = express.Router();
import multer from "multer";
import { verifyToken } from "../utils/jwtVerify.js";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // Specify the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      // Rename the file with original filename
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  });
const upload = multer({ storage: storage });


router.post('/add-course',upload.single('image'), addCourse)
router.get('/view-course',viewCourse)
router.get('/view-course/:id',verifyToken,viewCoursebyId)
router.put('/view-course/:id',upload.single('image') ,verifyToken,editCoursebyId)
router.delete('/view-course/:id',verifyToken,deleteCoursebyId)

export default router;