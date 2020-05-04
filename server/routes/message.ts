import { MessageService } from '../services';
import { Request, Router } from 'express';
import { IChat } from '../models/chat';
import { IStudent } from '../models/student';
import controller from './controller';
const router = Router();

// View all messages of chat
interface IAllMessagesReq extends Request {
  chat: IChat;
}
router.post(
  '/all',
  controller(async (req: IAllMessagesReq, res) => {
    const messages = await MessageService.getAll(req.chat);
    return res.send(messages);
  })
);

// Post new message
interface INewMessageReq extends Request {
  chat: IChat;
  user: IStudent;
  body: { content: string };
}
router.post(
  '/new',
  controller(async (req: INewMessageReq, res) => {
    const content = req.body.content;
    const message = await MessageService.postNew(req.user, req.chat, content);
    return res.send(message.toObject());
  })
);

export default router;
