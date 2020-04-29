// @flow
import mng from 'mongoose';
import { IITK_EMAIL_REGEX } from '../utils/constants';
import { generateToken as genToken } from '../utils/token';

const studentSchema = new mng.Schema({
  name: {
    type: String,
    required: true,
  },
  iitkEmail: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
    match: IITK_EMAIL_REGEX,
  },
  rollNo: {
    type: Number,
    required: true,
    unique: true,
    min: 10000,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  courses: {
    type: [{ type: mng.Types.ObjectId, ref: 'Course' }],
    required: true,
    default: [],
  },
  regStatus: {
    type: String,
    enum: ['unverified', 'done'],
    default: 'unverified',
  },
});

class StudentDoc /* :: extends Mongoose$Document */ {
  _id: MongoId;
  name: string;
  iitkEmail: string;
  rollNo: number;
  password: string;
  courses: Array<MongoId>;
  regStatus: 'unverified' | 'done';
}

studentSchema.loadClass(StudentDoc);
const Student = mng.model('Student', studentSchema);

export default Student;
