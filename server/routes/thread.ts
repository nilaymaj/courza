import { CourseService, ThreadService } from '../services';
import { Request, Router } from 'express';
import controller from './controller';
import { IStudent } from '../models/student';
import { ICourse } from '../models/course';
import { IThread } from '../models/thread';
const router = Router();

// Create new thread
interface INewThreadReq extends Request {
  user: IStudent;
  course: ICourse;
  body: { title: string; description: string };
}
router.post(
  '/new',
  controller(async (req: INewThreadReq, res) => {
    const { title, description } = req.body;
    const thread = await ThreadService.createThread(
      req.course,
      req.user,
      title,
      description
    );
    return res.send(thread.toObject());
  })
);

// View all threads of a course
interface IAllThreadsReq extends Request {
  course: ICourse;
}
router.post(
  '/all',
  controller(async (req: IAllThreadsReq, res) => {
    const threads = await ThreadService.getAll(req.course, true);
    return res.send(threads);
  })
);

// Rename thread
interface IRenameThreadReq extends Request {
  thread: IThread;
  body: { title: string };
}
router.post(
  '/rename',
  controller(async (req: IRenameThreadReq, res) => {
    const thread = await ThreadService.renameThread(req.thread, req.body.title);
    return res.send(thread.toObject());
  })
);

export default router;
