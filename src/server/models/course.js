import { Schema, Types } from '../db';
import { COURSE_CODE_REGEX } from '../../utils/constants';

const courseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    match: COURSE_CODE_REGEX
  },
  students: {
    type: [Types.ObjectId],
    required: true
  },
  chats: {
    type: [Types.ObjectId],
    required: true
  }
});

export const Course = courseSchema.model();
