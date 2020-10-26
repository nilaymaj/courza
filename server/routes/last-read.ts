import * as TimestampService from '../services/timestampService';
import { Request, Router } from 'express';
import controller, { getByIdOrThrow } from './controller';
import { IStudent } from '../models/student';
const router = Router();

// Get all timestamps from specified course
interface IGetTimestampsReq extends Request {
  body: {};
  user: IStudent;
  query: {
    courseId: string;
  };
}
router.get(
  '/all',
  controller(async (req: IGetTimestampsReq, res) => {
    const course = await getByIdOrThrow('Course', req.query.courseId);
    const timestamps = await TimestampService.getAllFromCourse(
      req.user,
      course
    );
    return res.send(timestamps);
  })
);

// Update timestamp of specific thread
interface IUpdateThreadTimeStampReq extends Request {
  body: {};
  user: IStudent;
  query: {
    threadId: string;
  };
}
router.put(
  '/update',
  controller(async (req: IUpdateThreadTimeStampReq, res) => {
    const thread = await getByIdOrThrow('Thread', req.query.threadId);
    const timestamp = await TimestampService.updateThread(req.user, thread);
    return res.send(timestamp);
  })
);

export default router;
