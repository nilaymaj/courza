// @ts-nocheck
import * as Services from '../services';
import { ValidationError, NotFoundError } from '../utils/errors';
import controller from '../routes/controller';
import { Request } from 'express';
import { ICourse } from '../models/course';
import { IChat } from '../models/chat';
import { IMessage } from '../models/message';

// This middleware looks at studentId, courseId and chatId of the request body.
// If any are found, the middleware attaches corresponding document object to the request.

interface IObjectifyReq extends Request {
  chat?: IChat;
  course?: ICourse;
  message?: IMessage;
  body: {
    courseId: string;
    chatId: string;
    messageId: string;
  };
}
export default controller(async (req: IObjectifyReq, res, next) => {
  const { courseId, chatId, messageId } = req.body;
  console.log(req.body);
  try {
    if (courseId) {
      req.course = await Services.CourseService.get(courseId);
      console.log('Objectify: req.course:', req.course);
      if (!req.course) throw new NotFoundError('Course not found');
    }
    if (chatId) {
      req.chat = await Services.ChatService.get(chatId);
      if (!req.chat) throw new NotFoundError('Chat not found');
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
