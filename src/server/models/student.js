import { Schema, Types } from '../db';
import { IITK_EMAIL_REGEX } from '../../utils/constants';

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
    min: 10000
  },
  courses: {
    type: [Types.ObjectId],
    required: true
  }
});

export const Student = studentSchema.model();
