const { Schema, Types } = require('../db');
const { COURSE_CODE_REGEX } = require('../utils/constants');
const Student = require('./student');
const Chat = require('./chat');

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
    type: [{ type: Types.ObjectId, ref: Student }],
    required: true,
    default: [],
  },
  creatorId: {
    type: Types.ObjectId,
    ref: Student,
    required: true,
  },
  chats: {
    type: [{ type: Types.ObjectId, ref: Chat }],
    required: true,
    default: [],
  },
});

module.exports = courseSchema.model('Course');
