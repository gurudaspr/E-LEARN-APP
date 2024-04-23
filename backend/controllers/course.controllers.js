
import Course from "../model/course.model.js";


export const viewCourse = async (req,res) => {
    try {
        const course = await Course.find();
        res.json(course);
    } catch  (error) {
        console.log("Error in course controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const addCourse = async (req, res) => {
    try {
      const { title, description, isNewtype } = req.body;

      const imageUrl = 'http://localhost:5000/' + req.file.destination + req.file.filename;
      const newCourse = new Course({
        title,
        imageUrl,
        description,
        isNewtype,
      });
      console.log(newCourse);

      
  
      const course = await Course.findOne({ title });
  
      if (course) {
        return res.status(400).json({ error: "Course already exists" });
      }
  
      if (newCourse) {
        await newCourse.save();
        res.status(201).json({
          _id: newCourse._id,
          title: newCourse.title,
          imageUrl: newCourse.imageUrl,
          description: newCourse.description,
          isNewtype: newCourse.isNewtype,
        });
      } else {
        res.status(400).json({ error: "Invalid course data" });
      }
    } catch (error) {
      console.log("Error in course controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };


export const viewCoursebyId = async (req,res) => {
     try {

    let { id } = req.params

    let data = await Course.findById(id)
    res.status(200).send({ data: data, message: 'Ok' })

  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error })
  }
}


export const deleteCoursebyId = async (req,res) => {
    try {
  
      let { id } = req.params
  
      await Course.findByIdAndDelete(id)
      res.status(200).send({ message: 'Deleted successfully' })
  
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error })
    }
  }

export const editCoursebyId = async (req,res) => {
    try {
        const new_data = req.body;
        const { id } = req.params
        console.log(new_data,id)
        await Course.findByIdAndUpdate(id, new_data)
        res.status(200).send({ status: true, message: 'Updated successfully' })
  
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error })
    }
  }
