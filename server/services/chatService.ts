import Chat, { IChat } from '../models/chat';
import Message, { IMessage } from '../models/message';
import { NotFoundError } from '../utils/errors';
import { newMessageValidator } from '../validators';
import { validate } from '../utils/validator';

/**
 * Finds and returns Chat object by ID
 *
 * @param {string} chatId ID of the chat
 * @returns Chat object
 */
export const get = async (chatId: string): Promise<IChat> => {
  const chat = await Chat.findById(chatId);
  if (!chat) throw new NotFoundError('Chat does not exist.');
  return chat;
};

/**
 * Returns all chats of a course
 *
 * @param {string} courseId ID of the course
 * @returns Promise, resolves with Chat objects
 */
export const getAll = async (courseId: string): Promise<IChat[]> => {
  const chats = await Chat.find({ course: courseId });
  return chats;
};

/**
 * Updates the title of a chat
 *
 * @param {Chat} chat Chat object
 * @param {string} newTitle New title of the chat
 * @returns Updated chat object
 */
export const changeTitle = async (
  chat: IChat,
  newTitle: string
): Promise<IChat> => {
  chat.title = newTitle;
  await chat.save();
  return chat;
};

/**
 * Adds new message to chat
 *
 * @param {IChat} chat Chat object
 * @param {Object} data Object with authorId and content of message
 * @returns Newly created Message object
 */
export const postMessage = async (
  chat: IChat,
  data: {
    author: string;
    content: string;
  }
): Promise<IMessage> => {
  validate(data, newMessageValidator);
  const message = new Message({ ...data, chat: chat._id });
  await message.save();
  chat.messages.push(message._id);
  await chat.save();
  return message;
};
