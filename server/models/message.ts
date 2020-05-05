import mng from 'mongoose';

// Document interface
export interface IMessage extends mng.Document {
  _id: mng.Types.ObjectId;
  author: mng.Types.ObjectId;
  content: string;
  votes: number;
  chat: mng.Types.ObjectId;
}

export interface IMessageInfo {
  _id: mng.Types.ObjectId;
  author: { _id: mng.Types.ObjectId; name: string };
  content: string;
  votes: number;
  chatId: mng.Types.ObjectId;
}

// Statics interface
interface IStatics extends mng.Model<IMessage> {}

// Database schema
const messageSchema = new mng.Schema<IMessage>(
  {
    author: {
      type: mng.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    content: {
      type: String,
      minlength: 1,
      maxlength: 1024,
      required: true,
    },
    votes: {
      type: Number,
      min: 0,
      default: 0,
      required: true,
    },
    chat: {
      type: mng.Types.ObjectId,
      ref: 'Chat',
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mng.model<IMessage, IStatics>('Message', messageSchema);
export default Message;
