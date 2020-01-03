import { CourseService } from '../services';
import controller from './controller';

export const createNewCourse = controller(async (req, res) => {
  const creatorId = req.student._id;
  const courseInfo = req.body;

  const course = await CourseService.create({ ...courseInfo, creatorId });
  return res.send(course.toObject());
});

export const viewAllCourses = controller(async (req, res) => {
  const courses = await CourseService.getAll();
  const plainCourses = courses.map(c => c.toObject());
  return res.send(plainCourses);
});
