const { StudentService } = require('../services');
const controller = require('./controller');

exports.registerNewStudent = controller(async (req, res) => {
  // TODO: COMPLETE THIS CONTROLLER
  const student = await StudentService.create(req.body);
  return res.send(student.toObject());
});
