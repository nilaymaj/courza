import mng from 'mongoose';

// Document interface
export interface IUserTimestamp extends mng.Document {
  _id: mng.Types.ObjectId;
  student: mng.Types.ObjectId;
  course: mng.Types.ObjectId;
  thread: mng.Types.ObjectId;
  timestamp: Date;
}

// Statics interface
interface IStatics extends mng.Model<IUserTimestamp> {}

// Database schema
const userTimestampSchema = new mng.Schema<IUserTimestamp>(
  {
    student: {
      type: mng.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    course: {
      type: mng.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    thread: {
      type: mng.Types.ObjectId,
      ref: 'Thread',
      required: true,
    },
    timestamp: {
      type: mng.Schema.Types.Date,
      required: true,
      default: new Date(0),
    },
  },
  { timestamps: true }
);

// Create compound index of name and course
userTimestampSchema.index({ student: 1, course: 1 });
userTimestampSchema.index({ student: 1, thread: 1 }, { unique: true });

const UserTimestamp = mng.model<IUserTimestamp, IStatics>(
  'UserTimestamp',
  userTimestampSchema
);
export default UserTimestamp;
