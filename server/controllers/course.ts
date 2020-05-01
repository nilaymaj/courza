import { CourseService } from '../services';
import { IStudent } from '../models/student';
import { Request } from 'express';
import controller from './controller';

interface INewCourseReq extends Request {
  user: IStudent;
  body: {
    name: string;
    code: string;
  };
}
export const createNewCourse = controller(async (req: INewCourseReq, res) => {
  const courseInfo = req.body;
  const course = await CourseService.create(courseInfo);
  return res.send(course.toObject());
});

interface IAllCoursesReq extends Request {}
export const viewAllCourses = controller(async (req: IAllCoursesReq, res) => {
  const courses = await CourseService.getAll();
  return res.send(courses);
});
