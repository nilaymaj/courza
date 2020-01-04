const { CourseService } = require('../services');
const controller = require('./controller');
const { pick } = require('lodash');

exports.createNewCourse = controller(async (req, res) => {
  const creator = req.user;
  const courseInfo = req.body;

  const course = await CourseService.create({ ...courseInfo, creator });
  return res.send(course.toObject());
});

exports.viewAllCourses = controller(async (req, res) => {
  const courses = await CourseService.getAll();
  const plainCourses = courses.map(c => pick(c.toObject(), ['_id', 'name', 'code']));
  return res.send(plainCourses);
});
