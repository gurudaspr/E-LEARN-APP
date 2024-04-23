
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

export const addCourse = async (req,res) => {

    try {
        const { title, imageUrl, description, isNewtype, } = req.body;
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


