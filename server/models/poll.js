import { Schema, Types } from '../db';
import Course from './course';
import Student from './student';

const pollSchema = new Schema({
  courseId: {
    type: Types.ObjectId,
    ref: Course,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 128,
  },
  options: {
    type: [
      {
        id: Number,
        text: String,
        students: [{ type: Types.ObjectId, ref: Student }],
      },
    ],
    required: true,
    minlength: 2,
  },
});

export default pollSchema.model('Poll');
