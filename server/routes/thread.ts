import { ThreadService } from '../services';
import { Request, Router } from 'express';
import controller, { getByIdOrThrow } from './controller';
import { IStudent } from '../models/student';
const router = Router();

// Create new thread
interface INewThreadReq extends Request {
  user: IStudent;
  body: { title: string; description: string; courseId: string };
}
router.post(
  '/new',
  controller(async (req: INewThreadReq, res) => {
    const course = await getByIdOrThrow('Course', req.body.courseId);
    const thread = await ThreadService.createThread(
      course,
      req.user,
      req.body.title,
      req.body.description
    );
    return res.send(thread.toObject());
  })
);

// View all threads of a course
interface IAllThreadsReq extends Request {
  query: {
    courseId: string;
  };
  body: {};
}
router.get(
  '/all',
  controller(async (req: IAllThreadsReq, res) => {
    const course = await getByIdOrThrow('Course', req.query.courseId);
    const threads = await ThreadService.getAll(course, true);
    return res.send(threads);
  })
);

// Rename thread
interface IRenameThreadReq extends Request {
  body: { title: string; threadId: string };
}
router.post(
  '/rename',
  controller(async (req: IRenameThreadReq, res) => {
    const oldThread = await getByIdOrThrow('Thread', req.body.threadId);
    const thread = await ThreadService.renameThread(oldThread, req.body.title);
    return res.send(thread.toObject());
  })
);

export default router;
