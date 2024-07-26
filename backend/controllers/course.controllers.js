import Course from "../model/course.model.js";
import cloudinary from "../utils/cloudinary.js";


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
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const { title, description, isNewtype } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "course",
      tags: "course",
      resource_type: "auto"
    });
    const imageUrl = result.secure_url;
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
    const publicId = imageUrl
      .split("/")
      .splice(-2)
      .join("/")
      .split(".")[0];
    await cloudinary.uploader.destroy(publicId);
    await Course.findByIdAndDelete(id)
    res.status(200).send({ message: 'Deleted successfully' })

  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error })
  }
}

export const editCoursebyId = async (req, res) => {
  try {
    const { id } = req.params;
    const new_data = req.body;

    // Find the existing course
    const existingCourse = await Course.findById(id);
    if (!existingCourse) {
      return res.status(404).json({ status: false, message: 'Course not found' });
    }

    // If there's a new file uploaded
    if (req.file) {
      // Delete the old image from Cloudinary
      if (existingCourse.imageUrl) {
        const publicId = existingCourse.imageUrl.split("/").splice(-2).join("/").split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload the new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "course",
        tags: "course",
        resource_type: "auto"
      });

      // Add the new image URL to the data to be updated
      new_data.imageUrl = result.secure_url;
    }

    // Update the course
    const updatedCourse = await Course.findByIdAndUpdate(id, new_data, { new: true });

    res.status(200).json({ 
      status: true, 
      message: 'Updated successfully', 
      course: updatedCourse 
    });

  } catch (error) {
    console.error("Error in editCoursebyId:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};
