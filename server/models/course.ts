import mng from 'mongoose';
import { COURSE_CODE_REGEX } from '../utils/constants';

// Document interface
export interface ICourse extends mng.Document {
  _id: mng.Types.ObjectId;
  name: string;
  code: string;
  students: mng.Types.ObjectId[];
  chats: mng.Types.ObjectId[];
  // Virtuals
  numOfStudents: number;

  /**
   * Returns object with basic info of the course
   * @returns Basic info of course
   */
  getInfo(): ICourseInfo;
}

// Statics interface
interface IStatics extends mng.Model<ICourse> {
  /**
   * Gets array of courses corresponding to given IDs
   *
   * @param {mng.Types.ObjectId[]} ids Array with course IDs
   * @returns {ICourse[]} Array of courses
   */
  getAllById(
    ids: mng.Types.ObjectId[]
  ): Promise<Pick<ICourse, '_id' | 'name' | 'code' | 'students' | 'chats'>[]>;
}

export interface ICourseInfo {
  _id: string;
  name: string;
  code: string;
  numOfStudents: number;
}

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
  students: {
    type: [{ type: mng.Types.ObjectId, ref: 'Student' }],
    required: true,
    default: [],
  },
  chats: {
    type: [{ type: mng.Types.ObjectId, ref: 'Chat' }],
    required: true,
    default: [],
  },
});

// Instance methods
courseSchema.methods.getInfo = function () {
  const c = <ICourse>this;
  return {
    _id: c._id.toString(),
    name: c.name,
    code: c.code,
    numOfStudents: c.numOfStudents,
  };
};

// Static methods
courseSchema.statics.getAllById = async function (ids: mng.Types.ObjectId[]) {
  const c = <mng.Model<ICourse, IStatics>>this;
  const courses = await c.find({ _id: { $in: ids } }).lean();
  return courses;
};

// Virtuals
courseSchema.virtual('numOfStudents').get(function () {
  return (<ICourse>this).students.length;
});

const Course = mng.model<ICourse, IStatics>('Course', courseSchema);
export default Course;
