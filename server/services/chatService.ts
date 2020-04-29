// import { Chat, Message } from '../models';
import Chat, { IChat } from '../models/chat';
import Message, { IMessage } from '../models/message';
import * as MessageService from './messageService';
import { NotFoundError } from '../utils/errors';
import { newChatValidator } from '../validators';
import { validate } from '../utils/validator';

/**
 * INTERNAL FUNCTION
 *
 * Creates new chat in database (does not update course object)
 *
 * @param {Object} data Object containing title, courseId and creatorId
 * @returns {Chat} Newly created chat object
 */
export const create = async (data: {
  title: string;
  courseId: string;
  creatorId: string;
}): Promise<IChat> => {
  validate(data, newChatValidator);
  const chat = new Chat({ ...data, messages: [] });
  await chat.save();
  return chat;
};

/**
 * Finds and returns Chat object by ID
 *
 * @param {string} chatId ID of the chat
 * @returns {Chat} Chat object
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
 * @returns {Promise} Promise, resolves with Chat objects
 */
export const getAll = async (courseId: string): Promise<IChat[]> => {
  const chats = await Chat.find({ courseId });
  return chats;
};

/**
 * Updates the title of a chat
 *
 * @param {Chat} chat Chat object
 * @param {string} newTitle New title of the chat
 * @returns {Chat} Updated chat object
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
 * @param {Chat} chat Chat object
 * @param {Object} data Object with authorId and body of message
 * @returns {Message} Newly created Message object
 */
export const postMessage = async (
  chat: IChat,
  data: {
    authorId: string;
    content: string;
  }
): Promise<IChat> => {
  // @ts-ignore
  const message = await MessageService.create({ ...data, chatId: chat._id });
  const messageId = message._id.toString();

  chat.messages.push(messageId);
  await chat.save();
  return message;
};
