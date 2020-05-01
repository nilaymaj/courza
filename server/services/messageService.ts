import Message, { IMessage, IMessageInfo } from '../models/message';
import { NotFoundError } from '../utils/errors';

/**
 * Creates new message object
 *
 * @param {Object} data Object containing authorId, body chatId
 * @returns Newly created message object
 */
export const create = async (data: {
  author: string;
  content: string;
  chat: string;
}): Promise<IMessage> => {
  const message = new Message(data);
  await message.save();
  return message;
};

/**
 * Finds and returns a Message object by its _id.
 *
 * @param {string} messageId ID of the message
 * @returns Message object
 */
export const get = async (messageId: string): Promise<IMessage> => {
  const message = await Message.findById(messageId);
  if (!message) throw new NotFoundError('Message does not exist.');
  return message;
};

/**
 * Finds and returns array of Message objects of given chat,
 * with usernames attached
 *
 * @param {string} chatId ID of the chat
 * @returns Array of Message objects
 */
export const getAll = async (chatId: string): Promise<Array<IMessageInfo>> => {
  const messages = await Message.find({ chatId })
    .populate('author', ['name', '_id'])
    .lean();
  return <IMessageInfo[]>(<unknown>messages);
};

/**
 * Upvotes a message
 *
 * @param {Message} message Message to upvote
 * @returns Updated Message object
 */
export const upvote = async (message: IMessage): Promise<IMessage> => {
  message.votes++;
  await message.save();
  return message;
};
