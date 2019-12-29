// @flow
import { Chat } from '../models';
import MessageService from './messageService';

export default class ChatService {
  /**
   * Creates new chat in database (does not update course object)
   *
   * @param {Object} data Object containing title, courseId and creatorId
   * @returns {Chat} Newly created chat object
   */
  static async create(data: {
    title: string,
    courseId: string,
    creatorId: string
  }): Chat {
    const chat = new Chat({ ...data, messages: [] });
    await chat.save();
    return chat;
  }

  /**
   * Updates the title of a chat
   *
   * @param {string} chatId ID of the chat
   * @param {string} newTitle New title of the chat
   * @returns {Chat} Updated chat object
   */
  static async changeTitle(chatId: string, newTitle: string): Chat {
    const chat = await Chat.findById(chatId);
    if (!chat) throw new Error('Chat does not exist');

    chat.title = newTitle;
    await chat.save();
    return chat;
  }

  /**
   * Creates new message in chat
   *
   * @param {string} chatId ID of the chat
   * @param {string} messageId ID of the message
   * @returns {Chat} Updated chat object
   */
  static async createNewMessage(
    chatId: string,
    data: {
      authorId: string,
      body: string
    }
  ): Chat {
    const chat = await Chat.findById(chatId);
    if (!chat) throw new Error('Chat does not exist');

    const message = await MessageService.create({ ...data, chatId });
    const messageId = message._id.toString();

    chat.messages.push(messageId);
    await chat.save();
    return chat;
  }
}
