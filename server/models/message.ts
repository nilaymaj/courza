import mng from 'mongoose';

class MessageDoc extends mng.Model {
  _id: mng.Types.ObjectId;
  authorId: mng.Types.ObjectId;
  content: string;
  votes: number;
  chatId: mng.Types.ObjectId;
}

export interface IMessage extends mng.Document {
  _id: mng.Types.ObjectId;
  authorId: mng.Types.ObjectId;
  content: string;
  votes: number;
  s;
  chatId: mng.Types.ObjectId;
}

const messageSchema = new mng.Schema<IMessage>({
  authorId: {
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
  chatId: {
    type: mng.Types.ObjectId,
    ref: 'Chat',
    required: true,
  },
});

messageSchema.loadClass(MessageDoc);
const Message = mng.model<IMessage>('Message', messageSchema);

export default Message;
