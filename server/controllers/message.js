import { MessageService, ChatService } from '../services';
import controller from './controller';

export const viewAllChatMessages = controller(async (req, res) => {
  const chatId = req.chat._id;
  const messages = await MessageService.getAll(chatId);
  return res.send(messages);
});

export const postNewMessage = controller(async (req, res) => {
  const chat = req.chat;
  const authorId = req.user._id;
  const content = req.body.content;
  const message = await ChatService.postMessage(chat, {
    authorId,
    content,
  });
  return res.send(message.toObject());
});
