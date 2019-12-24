import { Schema, Types } from '../db';

const chatSchema = new Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 30,
    required: true
  },
  course: {
    type: Types.ObjectId,
    required: true
  },
  creator: {
    type: Types.ObjectId,
    required: true
  },
  messages: {
    type: [Types.ObjectId],
    required: true
  }
});

export default chatSchema.model('Chat');
