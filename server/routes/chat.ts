import { CourseService, ChatService } from '../services';
import { Request, Router } from 'express';
import controller from './controller';
import { IStudent } from '../models/student';
import { ICourse } from '../models/course';
import { IChat } from '../models/chat';
const router = Router();

// Create new chat
interface INewChatReq extends Request {
  user: IStudent;
  course: ICourse;
  body: { title: string };
}
router.post(
  '/new',
  controller(async (req: INewChatReq, res) => {
    const title = req.body.title;
    const chat = await ChatService.createChat(req.course, req.user, title);
    return res.send(chat.toObject());
  })
);

// View all chats of a course
interface IAllChatsReq extends Request {
  course: ICourse;
}
router.post(
  '/all',
  controller(async (req: IAllChatsReq, res) => {
    const chats = await ChatService.getAll(req.course, true);
    return res.send(chats);
  })
);

// Rename chat
interface IRenameChatReq extends Request {
  chat: IChat;
  body: { title: string };
}
router.post(
  '/rename',
  controller(async (req: IRenameChatReq, res) => {
    const chat = await ChatService.renameChat(req.chat, req.body.title);
    return res.send(chat.toObject());
  })
);

export default router;
