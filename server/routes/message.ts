import { MessageService } from '../services';
import { Request, Router } from 'express';
import { IStudent } from '../models/student';
import controller, { getByIdOrThrow } from './controller';
const router = Router();

// View all messages of thread
interface IAllMessagesReq extends Request {
  body: {
    threadId: string;
  };
}
router.post(
  '/all',
  controller(async (req: IAllMessagesReq, res) => {
    const thread = await getByIdOrThrow('Thread', req.body.threadId);
    const messages = await MessageService.getAll(thread);
    return res.send(messages);
  })
);

// Post new message
interface INewMessageReq extends Request {
  user: IStudent;
  body: { content: string; threadId: string };
}
router.post(
  '/new',
  controller(async (req: INewMessageReq, res) => {
    const thread = await getByIdOrThrow('Thread', req.body.threadId);
    const content = req.body.content;
    const message = await MessageService.postNew(req.user, thread, content);
    return res.send(message.toObject());
  })
);

export default router;
