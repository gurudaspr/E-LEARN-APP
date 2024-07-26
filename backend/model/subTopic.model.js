import mongoose from "mongoose";

const subTopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String
  }
}, { timestamps: true });

const SubTopic = mongoose.model('SubTopic', subTopicSchema);

export default SubTopic;

