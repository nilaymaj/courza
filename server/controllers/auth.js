import { pick } from 'lodash';
import { StudentService } from '../services';
import { decodeToken } from '../utils/token';
import controller from './controller';

export const registerNewStudent = controller(async (req, res) => {
  const student = await StudentService.create(req.body);
  return res.send(student.toObject());
});

export const studentLogin = controller(async (req, res) => {
  const { iitkEmail, password } = req.body;
  const student = await StudentService.login(iitkEmail, password);
  const profile = await StudentService.getProfile(student);
  const token = StudentService.createToken(student);
  res.cookie('cz-token', token).send(profile);
});

export const checkToken = controller(async (req, res) => {
  const token = req.cookies['cz-token'];
  const payload = decodeToken(token);
  const student = await StudentService.get(payload._id);
  res.send(pick(student.toObject(), ['_id', 'iitkEmail', 'courses', 'name']));
});
