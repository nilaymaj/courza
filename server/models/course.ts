import mng from 'mongoose';
import { COURSE_CODE_REGEX } from '../utils/constants';

class CourseDoc extends mng.Document {
  _id: mng.Types.ObjectId;
  name: string;
  code: string;
  students: mng.Types.ObjectId[];
  creatorId: mng.Types.ObjectId;
  chats: mng.Types.ObjectId[];
}

export interface ICourse extends CourseDoc {}

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
  creatorId: {
    type: mng.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  chats: {
    type: [{ type: mng.Types.ObjectId, ref: 'Chat' }],
    required: true,
    default: [],
  },
});

courseSchema.loadClass(CourseDoc);
const Course = mng.model<ICourse>('Course', courseSchema);

export default Course;
