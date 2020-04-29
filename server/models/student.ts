import mng from 'mongoose';
import { IITK_EMAIL_REGEX } from '../utils/constants';
import { generateToken as genToken } from '../utils/token';

export class StudentDoc extends mng.Model {
  _id: mng.Types.ObjectId;
  name: string;
  iitkEmail: string;
  rollNo: number;
  password: string;
  courses: mng.Types.ObjectId[];

  generateToken(): string {
    const token = genToken({ _id: this._id });
    return token;
  }
}

export interface IStudent extends mng.Document {
  _id: mng.Types.ObjectId;
  name: string;
  iitkEmail: string;
  rollNo: number;
  password: string;
  courses: mng.Types.ObjectId[];

  /**
   * Generate JWT token with student ID as payload
   * @returns {string} JWT token string
   */
  generateToken(): string;
}

const studentSchema = new mng.Schema<IStudent>({
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

studentSchema.loadClass(StudentDoc);
const Student = mng.model<IStudent>('Student', studentSchema);

export default Student;
