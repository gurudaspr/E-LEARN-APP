import Course from "../model/course.model.js";
import fs from 'fs';
import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);


export const viewCourse = async (req, res) => {
  try {
    const course = await Course.find();
    res.json(course);
  } catch (error) {
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


export const viewCoursebyId = async (req, res) => {
  try {

    let { id } = req.params

    let data = await Course.findById(id)
    res.status(200).send({ data: data, message: 'Ok' })

  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error })
  }
}


export const deleteCoursebyId = async (req, res) => {
  try {
    let { id } = req.params
    const course = await Course.findById(id);
    const imageUrl = course.imageUrl;
    const filename = imageUrl.split('/').pop();
    const imagePath = path.join(__dirname, '../uploads', filename);
    console.log(imagePath);
    const cleanFilePath = imagePath.slice(1);
    fs.unlinkSync(cleanFilePath);
    await Course.findByIdAndDelete(id)
    res.status(200).send({ message: 'Deleted successfully' })

  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error })
  }
}

export const editCoursebyId = async (req, res) => {
  try {
    const new_data = req.body;
    const { id } = req.params
    // console.log(new_data,id)
    await Course.findByIdAndUpdate(id, new_data)
    res.status(200).send({ status: true, message: 'Updated successfully' })

  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error })
  }
}
