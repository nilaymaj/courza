import { Schema, Types } from '../db';
import { COURSE_CODE_REGEX } from '../utils/constants';

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    match: COURSE_CODE_REGEX,
  },
  students: {
    type: [{ type: Types.ObjectId, ref: 'Student' }],
    required: true,
    default: [],
  },
  creatorId: {
    type: Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  chats: {
    type: [{ type: Types.ObjectId, ref: 'Chat' }],
    required: true,
    default: [],
  },
});

export default courseSchema.model('Course');
