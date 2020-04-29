// @flow
import mng from 'mongoose';
import Course from './course';
import Student from './student';

const pollSchema = new mng.Schema({
  courseId: {
    type: mng.Types.ObjectId,
    ref: Course,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 128,
  },
  options: {
    type: [
      {
        id: Number,
        text: String,
        students: [{ type: mng.Types.ObjectId, ref: Student }],
      },
    ],
    required: true,
    minlength: 2,
  },
});

type Option = {|
  id: number,
  text: string,
  students: Array<MongoId>,
|};

class PollDoc /* :: extends Mongoose$Document */ {
  _id: MongoId;
  courseId: MongoId;
  description: string;
  options: Array<Option>;
}

pollSchema.loadClass(PollDoc);
const Poll = mng.model('Poll', pollSchema);

export default Poll;
