import mng from 'mongoose';

// Documnet interface
export interface IChat extends mng.Document {
  _id: mng.Types.ObjectId;
  title: string;
  course: mng.Types.ObjectId;
  creator: mng.Types.ObjectId;
  messages: mng.Types.ObjectId[];
}

// Statics interface
interface IStatics extends mng.Model<IChat> {}

// Database schema
const chatSchema = new mng.Schema<IChat>({
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
  messages: {
    type: [{ type: mng.Types.ObjectId, ref: 'Message' }],
    required: true,
    default: [],
  },
});

const Chat = mng.model<IChat, IStatics>('Chat', chatSchema);
export default Chat;
