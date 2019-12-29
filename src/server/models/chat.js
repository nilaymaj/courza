import { Schema, Types } from '../db';

const chatSchema = new Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 30,
    required: true
  },
  courseId: {
    type: Types.ObjectId,
    required: true
  },
  creatorId: {
    type: Types.ObjectId,
    required: true
  },
  messages: {
    type: [Types.ObjectId],
    required: true,
    default: []
  }
});

export default chatSchema.model('Chat');
