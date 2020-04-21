const { Schema, Types } = require('../db');
const Course = require('./course');
const Student = require('./student');
const Message = require('./message');

const chatSchema = new Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 30,
    required: true,
  },
  courseId: {
    type: Types.ObjectId,
    ref: Course,
    required: true,
  },
  creatorId: {
    type: Types.ObjectId,
    ref: Student,
    required: true,
  },
  messages: {
    type: [{ type: Types.ObjectId, ref: Message }],
    required: true,
    default: [],
  },
});

module.exports = chatSchema.model('Chat');
