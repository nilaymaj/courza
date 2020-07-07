import mng from 'mongoose';

// Document interface
export interface IThread extends mng.Document {
  _id: mng.Types.ObjectId;
  title: string;
  course: mng.Types.ObjectId;
  creator: mng.Types.ObjectId;
}

// Statics interface
interface IStatics extends mng.Model<IThread> {}

// Database schema
const threadSchema = new mng.Schema<IThread>(
  {
    title: {
      type: String,
      minlength: 5,
      maxlength: 30,
      required: true,
    },
    course: {
      type: mng.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    creator: {
      type: mng.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
  },
  { timestamps: true }
);

const Thread = mng.model<IThread, IStatics>('Thread', threadSchema);
export default Thread;
