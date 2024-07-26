import Topic from '../model/topic.model.js';
import SubTopic from '../model/subTopic.model.js';
import cloudinary from '../utils/cloudinary.js';


export const addTopic = async (req, res) => {
    const { title, course } = req.body;
    try {
        const topic = new Topic({
            title,
            course,
            subTopics: []
        });
        await topic.save();
        res.status(201).json({ message: 'Topic created successfully' });
    }
    catch (error) {
        console.error('Error occurred during topic creation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


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
        res.status(201).json({ message: 'SubTopic created successfully' });
        const topic = await Topic.findById(topicId);
        topic.subTopics.push(newSubTopic._id);
        await topic.save();
    }
    catch (error) {
        console.error('Error occurred during subtopic creation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const viewTopic = async (req, res) => {
    const {courseId } = req.body;
    try {
        const topic = await Topic.findOne({ courseId}).populate('subTopics');
        res.status(200).json(topic);
    }
    catch (error) {
        console.error('Error fetching topic:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
