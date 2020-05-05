import Message, { IMessage } from '../models/message';
import { NotFoundError } from '../utils/errors';
import { IStudent } from '../models/student';
import { IChat } from '../models/chat';
import { validateMessage } from '../utils/validators';

/**
 * Posts new message by student in given chat
 */
export const postNew = async (
  student: IStudent,
  chat: IChat,
  content: string
): Promise<IMessage> => {
  validateMessage({ content });
  const message = new Message({ content, author: student._id, chat: chat._id });
  await message.save();
  return message;
};

/**
 * Finds and returns message by ID
 */
export const get = async (messageId: string, lean = false) => {
  const message = await Message.findById(messageId).lean(lean);
  if (!message) throw new NotFoundError('Chat does not exist');
  return message;
};

/**
 * Returns all messages in a given chat
 */
export const getAll = async (chat: IChat, lean = false) => {
  const messages = await Message.find({ chat: chat._id }).lean(lean);
  return messages;
};
