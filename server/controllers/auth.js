const { pick } = require('lodash');
const { StudentService } = require('../services');
const { decodeToken } = require('../utils/token');
const controller = require('./controller');

exports.registerNewStudent = controller(async (req, res) => {
  const student = await StudentService.create(req.body);
  return res.send(student.toObject());
});

exports.studentLogin = controller(async (req, res) => {
  const { iitkEmail, password } = req.body;
  const student = await StudentService.login(iitkEmail, password);
  const profile = await StudentService.getProfile(student);
  const token = StudentService.createToken(student);
  res.cookie('cz-token', token).send(profile);
});

exports.checkToken = controller(async (req, res) => {
  const token = req.cookies['cz-token'];
  const payload = decodeToken(token);
  const student = await StudentService.get(payload._id);
  res.send(pick(student.toObject(), ['_id', 'iitkEmail', 'courses', 'name']));
});
