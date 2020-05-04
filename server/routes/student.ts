import { Request, Router } from 'express';
import { IStudent } from '../models/student';
import controller from './controller';
import * as EnrolmentService from '../services/enrolmentService';
import * as ChatService from '../services/chatService';
const router = Router();

// Get basic student profile
interface IProfileReq extends Request {
  user: IStudent;
}
router.get(
  '/profile',
  controller(async (req: IProfileReq, res) => {
    const { user } = req;
    return res.send(user.getInfo());
  })
);

// Get full student profile
interface IFullProfileReq extends Request {
  user: IStudent;
}
router.get(
  '/fullprofile',
  controller(async (req: IFullProfileReq, res) => {
    const student = req.user;
    const basicInfo = student.getInfo();
    const courses = await EnrolmentService.getStudentCourses(student, true);
    const fullCourses = await Promise.all(
      courses.map(async (c) => {
        // @ts-ignore
        const chats = await ChatService.getAll(c, true);
        return { ...c, chats };
      })
    );
    return res.send({ ...basicInfo, courses: fullCourses });
  })
);

export default router;
