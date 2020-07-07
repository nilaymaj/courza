import { MessageService } from '../services';
import { Request, Router } from 'express';
import { IThread } from '../models/thread';
import { IStudent } from '../models/student';
import controller from './controller';
const router = Router();

// View all messages of thread
interface IAllMessagesReq extends Request {
  thread: IThread;
}
router.post(
  '/all',
  controller(async (req: IAllMessagesReq, res) => {
    const messages = await MessageService.getAll(req.thread);
    return res.send(messages);
  })
);

// Post new message
interface INewMessageReq extends Request {
  thread: IThread;
  user: IStudent;
  body: { content: string };
}
router.post(
  '/new',
  controller(async (req: INewMessageReq, res) => {
    const content = req.body.content;
    const message = await MessageService.postNew(req.user, req.thread, content);
    return res.send(message.toObject());
  })
);

export default router;
