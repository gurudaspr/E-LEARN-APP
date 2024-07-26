import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  subTopics: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'SubTopic',
    required: true
  }
}, { timestamps: true });

const Topic = mongoose.model('Topic', topicSchema);

export default Topic;
