import mng from 'mongoose';

class ChatDoc extends mng.Document {
  _id: mng.Types.ObjectId;
  title: string;
  courseId: mng.Types.ObjectId;
  creatorId: mng.Types.ObjectId;
  messages: mng.Types.ObjectId[];
}

export interface IChat extends ChatDoc {}

const chatSchema = new mng.Schema<IChat>({
  title: {
    type: String,
    minlength: 5,
    maxlength: 30,
    required: true,
  },
  courseId: {
    type: mng.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  creatorId: {
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

chatSchema.loadClass(ChatDoc);
const Chat = mng.model<IChat>('Chat', chatSchema);

export default Chat;
