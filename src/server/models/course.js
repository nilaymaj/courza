const { Schema, Types } = require('../db');
const { COURSE_CODE_REGEX } = require('../utils/constants');

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
  creatorId: {
    type: Types.ObjectId,
    required: true
  },
  chats: {
    type: [Types.ObjectId],
    required: true,
    default: []
  }
});

module.exports = courseSchema.model('Course');
