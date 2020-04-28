import { Schema, Types } from '../db';

const chatSchema = new Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 30,
    required: true,
  },
  courseId: {
    type: Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  creatorId: {
    type: Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  messages: {
    type: [{ type: Types.ObjectId, ref: 'Message' }],
    required: true,
    default: [],
  },
});

export default chatSchema.model('Chat');
