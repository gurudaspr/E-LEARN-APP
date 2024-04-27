import Enrollment from "../model/enrollment.model.js";

export const enrollCourse = async (req, res) => {
    try {
        const { userId, courseId } = req.body;
        const existingEnrollment = await Enrollment.findOne({ userId, courseId });
        if (existingEnrollment) {
          return res.status(400).json({ message: 'User already enrolled in this course' });
        }
        const enrollment = new Enrollment({ userId, courseId });
        await enrollment.save();
        res.status(200).json({ message: 'Enrollment successful' });
      } catch (error) {
        console.error('Error occurred during enrollment:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    
}

export const viewEnrollCourse = async (req, res) => {
  const { userId } = req.body;
    try {
        const enrollments = await Enrollment.find({ userId}).populate('courseId');
        res.status(200).json(enrollments);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}