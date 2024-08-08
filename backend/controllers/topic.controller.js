import Topic from '../model/topic.model.js';
import SubTopic from '../model/subTopic.model.js';
import cloudinary from '../utils/cloudinary.js';
import Course from '../model/course.model.js';


export const addTopic = async (req, res) => {
    const { title, course } = req.body;
    try {
      const topic = new Topic({
        title,
        course,
        subTopics: [],
      });
      await topic.save();
      res.status(201).json({ message: 'Topic created successfully', topic });
    } catch (error) {
      console.error('Error occurred during topic creation:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


export const addSubTopic = async (req, res) => {

 try {
        if (!req.file) {
          return res
            .status(400)
            .json({ success: false, message: "No file uploaded" });
        } 
        const { title,topicId } = req.body;
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "topic",
          tags: "topic",
          resource_type: "auto"
        });
        const videoUrl = result.secure_url;
        const newSubTopic = new SubTopic({
            title,
            videoUrl,
        }); 

        await newSubTopic.save();
        const topic = await Topic.findById(topicId);
        topic.subTopics.push(newSubTopic._id);
        await topic.save();
        res.status(201).json({ message: 'SubTopic created successfully', subtopic: newSubTopic });
    }
    catch (error) {
        console.error('Error occurred during subtopic creation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const viewTopic = async (req, res) => {
  const { id } = req.params;

  try {
    // Find all topics for the given courseId and populate their subTopics
    const course = await Course.findById(id);
    const topics = await Topic.find({ course: id })
      .populate('subTopics')
    res.status(200).json({ topics , course });
  } catch (error) {
    console.error('Error while fetching topics:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
