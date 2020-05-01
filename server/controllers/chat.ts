import { CourseService, ChatService } from '../services';
import { Request } from 'express';
import controller from './controller';
import { IStudent } from '../models/student';
import { ICourse } from '../models/course';

interface INewChatReq extends Request {
  user: IStudent;
  course: ICourse;
  body: { title: string };
}
export const createNewChat = controller(async (req: INewChatReq, res) => {
  const creator = req.user._id.toString();
  const title = req.body.title;

  const chat = await CourseService.createNewChat(req.course, {
    title,
    creator,
  });
  return res.send(chat.toObject());
});

interface IAllChatsReq extends Request {
  course: ICourse;
}
export const viewAllCourseChats = controller(async (req: IAllChatsReq, res) => {
  const courseId = req.course._id.toString();
  const chats = await ChatService.getAll(courseId);
  const plainChats = chats.map((c) => c.toObject());
  return res.send(plainChats);
});
