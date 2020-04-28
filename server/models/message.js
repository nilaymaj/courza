const { Schema, Types } = require('../db');

const messageSchema = new Schema({
  authorId: {
    type: Types.ObjectId,
    ref: 'Student',
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
    ref: 'Chat',
    required: true,
  },
});

module.exports = messageSchema.model('Message');
