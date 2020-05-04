import { CourseService } from '../services';
import { IStudent } from '../models/student';
import { Router, Request } from 'express';
import controller from './controller';
const router = Router();

// Create new course
interface INewCourseReq extends Request {
  user: IStudent;
  body: {
    name: string;
    code: string;
  };
}
router.post(
  '/new',
  controller(async (req: INewCourseReq, res) => {
    const courseInfo = req.body;
    const course = await CourseService.create(courseInfo);
    return res.send(course.toObject());
  })
);

// View all courses
interface IAllCoursesReq extends Request {}
router.get(
  '/all',
  controller(async (req: IAllCoursesReq, res) => {
    const courses = await CourseService.getAll(true);
    return res.send(courses);
  })
);

export default router;
