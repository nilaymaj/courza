const { Schema, Types } = require('../db');
const Student = require('./student');

const messageSchema = new Schema({
  authorId: {
    type: Types.ObjectId,
    ref: Student,
    required: true,
  },
  content: {
    type: String,
    minlength: 1,
    maxlength: 1024,
    required: true,
  },
  votes: {
    type: Number,
    min: 0,
    default: 0,
    required: true,
  },
  chatId: {
    type: Types.ObjectId,
    // TODO: Fix this ref
    // ref: Chat,
    required: true,
  },
});

module.exports = messageSchema.model('Message');
