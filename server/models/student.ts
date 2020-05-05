import mng from 'mongoose';
import { IITK_EMAIL_REGEX } from '../utils/constants';
import { generateToken as genToken } from '../utils/token';

// Document interface
export interface IStudent extends mng.Document {
  _id: mng.Types.ObjectId;
  name: string;
  iitkEmail: string;
  rollNo: number;
  password: string;

  /**
   * Generate JWT token with student ID as payload
   * @returns {string} JWT token string
   */
  generateToken(): string;

  /**
   * Returns basic student info without courses
   * @returns {IStudentInfo} Basic info of the student
   */
  getInfo(): IStudentInfo;
}

export interface IStudentInfo {
  _id: string;
  name: string;
  iitkEmail: string;
  rollNo: number;
}

// Statics interface
interface IStatics extends mng.Model<IStudent> {}

// Database schema
const studentSchema = new mng.Schema<IStudent>(
  {
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
    regStatus: {
      type: String,
      enum: ['unverified', 'done'],
      default: 'unverified',
    },
  },
  { timestamps: true }
);

// Instance methods
studentSchema.methods.generateToken = function (): string {
  const token = genToken({ _id: this._id });
  return token;
};

studentSchema.methods.getInfo = function (): IStudentInfo {
  return {
    _id: this._id.toString(),
    name: this.name,
    iitkEmail: this.iitkEmail,
    rollNo: this.rollNo,
  };
};

const Student = mng.model<IStudent, IStatics>('Student', studentSchema);
export default Student;
