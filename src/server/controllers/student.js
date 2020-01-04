const { StudentService } = require('../services');
const { pick } = require('lodash');
const controller = require('./controller');

exports.joinCourse = controller(async (req, res) => {
  const { user, course } = req;

  const updated = await StudentService.joinCourse(user, course);
  return res.send(pick(updated, ['_id', 'iitkEmail', 'courses']));
});
