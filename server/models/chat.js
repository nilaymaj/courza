// @flow
import mng from 'mongoose';

const chatSchema = new mng.Schema({
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

class ChatDoc /* :: extends Mongoose$Document */ {
  _id: MongoId;
  title: string;
  courseId: MongoId;
  creatorId: MongoId;
  messages: Array<MongoId>;
}

chatSchema.loadClass(ChatDoc);
const Chat = mng.model('Chat', chatSchema);

export default Chat;
