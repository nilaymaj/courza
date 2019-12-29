// @flow
import { Message } from '../models';

export default class MessageService {
  /**
   * Creates new message object
   *
   * @param {Object} data Object containing authorId, body chatId
   * @returns {Message} Newly created message object
   */
  static async create(data: {
    authorId: string,
    body: string,
    chatId: string
  }): Message {
    const message = new Message(data);
    await message.save();
    return message;
  }

  /**
   * Upvotes a message
   *
   * @param {string} messageId ID of the message to upvote
   * @returns {Message} Updated Message object
   */
  static async upvote(messageId: string): Message {
    const message = await Message.findById(messageId);
    if (!message) throw new Error('Message does not exist.');

    message.votes++;
    await message.save();
    return message;
  }
}
