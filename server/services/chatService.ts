import Chat, { IChat } from '../models/chat';
import { ICourse } from '../models/course';
import { IStudent } from '../models/student';
import { validateChat } from '../utils/validators';
import { NotFoundError } from '../utils/errors';
import Message from '../models/message';

/**
 * Creates a new chat in given course
 */
export const createChat = async (
  course: ICourse,
  student: IStudent,
  title: string
): Promise<IChat> => {
  validateChat({ title });
  const chat = new Chat({
    title: title,
    creator: student._id,
    course: course._id,
  });
  await chat.save();
  return chat;
};

/**
 * Find and return chat by ID
 */
export const get = async (chatId: string, lean = false) => {
  const chat = await Chat.findById(chatId).lean(lean);
  if (!chat) throw new NotFoundError('Chat does not exist');
  return chat;
};

/**
 * Returns list of all chats from a course
 */
export const getAll = async (course: ICourse, lean = false) => {
  const chats = await Chat.find({ course: course._id }).lean(lean);
  return chats;
};

/**
 * Changes the title of a chat
 */
export const renameChat = async (
  chat: IChat,
  title: string
): Promise<IChat> => {
  validateChat({ title });
  chat.title = title;
  await chat.save();
  return chat;
};

/**
 * Deletes chat from database
 */
export const deleteChat = async (chat: IChat): Promise<void> => {
  await Message.deleteMany({ chat: chat._id });
  await chat.remove();
  return;
};
