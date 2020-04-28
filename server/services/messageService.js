// @flow
import { Message } from '../models';
import { NotFoundError } from '../utils/errors';

/**
 * Creates new message object
 *
 * @param {Object} data Object containing authorId, body chatId
 * @returns {Message} Newly created message object
 */
export const create = async (data: {
  authorId: string,
  content: string,
  chatId: string,
}): Message => {
  const message = new Message(data);
  await message.save();
  return message;
};

/**
 * Finds and returns a Message object by its _id.
 *
 * @param {string} messageId ID of the message
 * @returns {Message} Message object
 */
export const get = async (messageId: string): Message => {
  const message = await Message.findById(messageId);
  if (!message) throw new NotFoundError('Message does not exist.');
  return message;
};

/**
 * Finds and returns array of Message objects of given chat,
 * with usernames attached
 *
 * @param {string} chatId ID of the chat
 * @returns {Array<Message>} Array of Message objects
 */
export const getAll = async (chatId: string): Promise<Array<Message>> => {
  const messages = Message.find({ chatId })
    .populate('authorId', ['name', '_id'])
    .lean();
  return messages;
};

/**
 * Upvotes a message
 *
 * @param {Message} message Message to upvote
 * @returns {Message} Updated Message object
 */
export const upvote = async (message: Message): Message => {
  message.votes++;
  await message.save();
  return message;
};
