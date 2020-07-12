import * as EnrolmentService from '../services/enrolmentService';
import { Router, Request } from 'express';
import { ICourse } from '../models/course';
import { IStudent } from '../models/student';
import controller, { getByIdOrThrow } from './controller';
const router = Router();

// Enrol student in course
interface IJoinCourseReq extends Request {
  user: IStudent;
  body: {
    courseId: string;
  };
  course: ICourse;
}
router.post(
  '/join',
  controller(async (req: IJoinCourseReq, res) => {
    const course = await getByIdOrThrow('Course', req.body.courseId);
    await EnrolmentService.joinCourse(req.user, course);
    return res.send(course);
  })
);

// Deregister student from course
interface IUnenrolCourseReq extends Request {
  user: IStudent;
  body: {
    courseId: string;
  };
}
router.post(
  '/leave',
  controller(async (req: IUnenrolCourseReq, res) => {
    const course = await getByIdOrThrow('Course', req.body.courseId);
    await EnrolmentService.leaveCourse(req.user, course);
    res.send(course);
  })
);

// View student's courses
interface IStudCoursesReq extends Request {
  user: IStudent;
  body: {};
}
router.get(
  '/view',
  controller(async (req: IStudCoursesReq, res) => {
    const courses = await EnrolmentService.getStudentCourses(req.user, true);
    return res.send(courses);
  })
);

export default router;
