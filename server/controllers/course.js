import { CourseService } from '../services';
import controller from './controller';
import { pick } from 'lodash';

export const createNewCourse = controller(async (req, res) => {
  const creator = req.user;
  const courseInfo = req.body;

  const course = await CourseService.create({ ...courseInfo, creator });
  return res.send(course.toObject());
});

export const viewAllCourses = controller(async (req, res) => {
  const courses = await CourseService.getAll();
  return res.send(courses);
});
