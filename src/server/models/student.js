import { Schema } from '../db';
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
    match: IITK_EMAIL_REGEX
  },
  rollNo: {
    type: Number,
    min: 10000
  },
  courses: [String]
});

export const Student = studentSchema.model();
