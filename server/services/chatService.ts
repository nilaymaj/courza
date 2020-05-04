import Chat, { IChat } from '../models/chat';
import { ICourse } from '../models/course';
import { IStudent } from '../models/student';
import { newChatValidator } from '../validators';
import { validate } from '../utils/validator';
import { NotFoundError } from '../utils/errors';

/**
 * Creates a new chat in given course
 */
export const createChat = async (
  course: ICourse,
  student: IStudent,
  title: string
): Promise<IChat> => {
  validate({ title }, newChatValidator);
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
  validate({ title }, newChatValidator);
  chat.title = title;
  await chat.save();
  return chat;
};

/**
 * Deletes chat from database
 */
export const deleteChat = async (chat: IChat): Promise<void> => {
  await chat.remove();
  return;
};
