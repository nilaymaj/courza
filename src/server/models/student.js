const { Schema, Types } = require('../db');
const { IITK_EMAIL_REGEX } = require('../utils/constants');

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  iitkEmail: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
    match: IITK_EMAIL_REGEX
  },
  rollNo: {
    type: Number,
    required: true,
    unique: true,
    min: 10000
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  },
  courses: {
    type: [Types.ObjectId],
    required: true,
    default: []
  },
  regStatus: {
    type: String,
    enum: ['unverified', 'done'],
    default: 'unverified'
  }
});

module.exports = studentSchema.model('Student');
