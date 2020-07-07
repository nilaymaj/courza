// @ts-nocheck
import * as Services from '../services';
import { ValidationError, NotFoundError } from '../utils/errors';
import controller from '../routes/controller';
import { Request } from 'express';
import { ICourse } from '../models/course';
import { IThread } from '../models/thread';
import { IMessage } from '../models/message';

// This middleware looks at studentId, courseId and threadId of the request body.
// If any are found, the middleware attaches corresponding document object to the request.

interface IObjectifyReq extends Request {
  thread?: IThread;
  course?: ICourse;
  message?: IMessage;
  body: {
    courseId: string;
    threadId: string;
    messageId: string;
  };
}
export default controller(async (req: IObjectifyReq, res, next) => {
  const { courseId, threadId, messageId } = req.body;
  try {
    if (courseId) {
      req.course = await Services.CourseService.get(courseId);
      if (!req.course) throw new NotFoundError('Course not found');
    }
    if (threadId) {
      req.thread = await Services.ThreadService.get(threadId);
      if (!req.thread) throw new NotFoundError('Thread not found');
    }
    if (messageId) {
      req.message = await Services.MessageService.get(messageId);
      if (!req.message) throw new NotFoundError('Message not found');
    }
    next();
  } catch (err) {
    return res.status(400).send(new ValidationError('Invalid ID provided.'));
  }
});
