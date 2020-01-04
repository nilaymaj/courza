const { Schema, Types } = require('../db');

const messageSchema = new Schema({
  authorId: {
    type: Types.ObjectId,
    required: true
  },
  body: {
    type: String,
    minlength: 1,
    maxlength: 1024,
    required: true
  },
  votes: {
    type: Number,
    min: 0,
    default: 0,
    required: true
  },
  chatId: {
    type: Types.ObjectId,
    required: true
  }
});

module.exports = messageSchema.model('Message');
