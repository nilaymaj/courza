import mng from 'mongoose';
import { COURSE_CODE_REGEX } from '../utils/constants';

// Document interface
export interface ICourse extends mng.Document {
  _id: mng.Types.ObjectId;
  name: string;
  code: string;
}

// Statics interface
interface IStatics extends mng.Model<ICourse> {}

// Database schema
const courseSchema = new mng.Schema<ICourse>({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    match: COURSE_CODE_REGEX,
  },
});

const Course = mng.model<ICourse, IStatics>('Course', courseSchema);
export default Course;
