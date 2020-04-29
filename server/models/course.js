// @flow
import mng from 'mongoose';
import { COURSE_CODE_REGEX } from '../utils/constants';

const courseSchema = new mng.Schema({
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

class CourseDoc /* :: extends Mongoose$Document */ {
  _id: MongoId;
  name: string;
  code: string;
  students: Array<MongoId>;
  creatorId: MongoId;
  chats: Array<MongoId>;
}

courseSchema.loadClass(CourseDoc);
const Course = mng.model('Course', courseSchema);

export default Course;
