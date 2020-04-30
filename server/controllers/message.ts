import { MessageService, ChatService } from '../services';
import { Request } from 'express';
import { IChat } from '../models/chat';
import controller from './controller';
import { IStudent } from '../models/student';

interface IAllMessagesReq extends Request {
  chat: IChat;
}
export const viewAllChatMessages = controller(
  async (req: IAllMessagesReq, res) => {
    const chatId = req.chat._id.toString();
    const messages = await MessageService.getAll(chatId);
    return res.send(messages);
  }
);

interface INewMessageReq extends Request {
  chat: IChat;
  user: IStudent;
  body: { content: string };
}
export const postNewMessage = controller(async (req: INewMessageReq, res) => {
  const chat = req.chat;
  const authorId = req.user._id.toString();
  const content = req.body.content;
  const message = await ChatService.postMessage(chat, {
    authorId,
    content,
  });
  return res.send(message.toObject());
});
