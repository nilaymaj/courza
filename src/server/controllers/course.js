const { CourseService } = require('../services');
const controller = require('./controller');

exports.createNewCourse = controller(async (req, res) => {
  const creatorId = req.student._id;
  const courseInfo = req.body;

  const course = await CourseService.create({ ...courseInfo, creatorId });
  return res.send(course.toObject());
});

exports.viewAllCourses = controller(async (req, res) => {
  const courses = await CourseService.getAll();
  const plainCourses = courses.map(c => c.toObject());
  return res.send(plainCourses);
});
