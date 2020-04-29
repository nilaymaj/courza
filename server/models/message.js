// @flow
import mng from 'mongoose';

const messageSchema = new mng.Schema({
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

class MessageDoc /* :: extends Mongoose$Document */ {
  _id: MongoId;
  authorId: MongoId;
  content: string;
  votes: number;
  chatId: MongoId;
}

messageSchema.loadClass(MessageDoc);
const Message = mng.model('Message', messageSchema);

export default Message;
