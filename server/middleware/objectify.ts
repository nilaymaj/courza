import * as Services from '../services';
import { ValidationError } from '../utils/errors';
import controller from '../controllers/controller';
import { Request } from 'express';
import { ICourse } from '../models/course';
import { IChat } from '../models/chat';
import { IMessage } from '../models/message';
import { IPoll } from '../models/poll';

// This middleware looks at studentId, courseId and chatId of the request body.
// If any are found, the middleware attaches corresponding document object to the request.

interface IObjectifyReq extends Request {
  chat?: IChat;
  course?: ICourse;
  message?: IMessage;
  poll?: IPoll;
}
export default controller(async (req: IObjectifyReq, res, next) => {
  const { courseId, pollId, chatId, messageId } = req.body;
  try {
    if (courseId) req.course = await Services.CourseService.get(courseId);
    if (chatId) req.chat = await Services.ChatService.get(chatId);
    if (messageId) req.message = await Services.MessageService.get(messageId);
    if (pollId) req.poll = await Services.PollService.get(pollId);
    next();
  } catch (err) {
    return res.status(400).send(new ValidationError('Invalid ID provided.'));
  }
});
