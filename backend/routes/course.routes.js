import express from "express"
import { addCourse, viewCourse,  deleteCoursebyId, viewCoursebyId,editCoursebyId } from "../controllers/course.controllers.js";
const router = express.Router();
import multer from "multer";


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
router.get('/view-course/:id',viewCoursebyId)
router.put('/view-course/:id',upload.single('image') ,editCoursebyId)
router.delete('/view-course/:id',deleteCoursebyId)

export default router;