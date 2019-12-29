import { Schema, Types } from '../db';

const pollSchema = new Schema({
  courseId: {
    type: Types.ObjectId,
    required: true
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 128
  },
  options: {
    type: [{ id: Number, text: String, students: [Types.ObjectId] }],
    required: true,
    minlength: 2
  }
});

export default pollSchema.model();
