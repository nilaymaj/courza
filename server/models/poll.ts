import mng from 'mongoose';
import Course from './course';
import Student from './student';

// Document interface
export interface IPoll extends mng.Document {
  _id: mng.Types.ObjectId;
  course: mng.Types.ObjectId;
  description: string;
  options: Option[];
}

// Statics interface
interface IStatics extends mng.Model<IPoll> {}

type Option = {
  id: number;
  text: string;
  students: mng.Types.ObjectId[];
};

// Database schema
const pollSchema = new mng.Schema<IPoll>({
  course: {
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

const Poll = mng.model<IPoll, IStatics>('Poll', pollSchema);
export default Poll;
