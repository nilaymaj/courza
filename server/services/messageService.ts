import Message, { IMessage } from '../models/message';
import { NotFoundError } from '../utils/errors';
import { IStudent } from '../models/student';
import { IThread } from '../models/thread';
import { validateMessage } from '../utils/validators';
import ioEmitter from '../realtime';

/**
 * Posts new message by student in given thread
 */
export const postNew = async (
  student: IStudent,
  thread: IThread,
  content: string
): Promise<IMessage> => {
  validateMessage({ content });
  const message = new Message({
    content,
    author: student._id,
    thread: thread._id,
  });
  await message.save();
  // @ts-ignore Document#populate typings are apparently a bit inaccurate
  await message.populate('author', ['_id', 'name']).execPopulate();
  ioEmitter.emitToCourse(thread.course, 'new-message', message);
  return message;
};

/**
 * Finds and returns message by ID
 */
export const get = async (messageId: string, lean = false) => {
  const message = await Message.findById(messageId).lean(lean);
  if (!message) throw new NotFoundError('Thread does not exist');
  return message;
};

/**
 * Returns all messages in a given thread
 */
export const getAll = async (thread: IThread, lean = false) => {
  const messages = await Message.find({ thread: thread._id })
    .populate('author', ['_id', 'name'])
    .lean(lean);
  return messages;
};
