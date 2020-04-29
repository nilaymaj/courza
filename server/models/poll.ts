import mng from 'mongoose';
import Course from './course';
import Student from './student';

type Option = {
  id: number;
  text: string;
  students: mng.Types.ObjectId[];
};

class PollDoc extends mng.Document {
  _id: mng.Types.ObjectId;
  courseId: mng.Types.ObjectId;
  description: string;
  options: Option[];
}

export interface IPoll extends PollDoc {}

const pollSchema = new mng.Schema<IPoll>({
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

pollSchema.loadClass(PollDoc);
const Poll = mng.model<IPoll>('Poll', pollSchema);

export default Poll;
