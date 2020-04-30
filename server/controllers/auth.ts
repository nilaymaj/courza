import { pick } from 'lodash';
import { StudentService } from '../services';
import { Request } from 'express';
import { decodeToken } from '../utils/token';
import controller from './controller';

interface IRegisterReq extends Request {
  body: { name: string; iitkEmail: string; rollNo: number; password: string };
}
export const registerNewStudent = controller(async (req: IRegisterReq, res) => {
  const student = await StudentService.create(req.body);
  return res.send(student.toObject());
});

interface ILoginReq extends Request {
  body: { iitkEmail: string; password: string };
}
export const studentLogin = controller(async (req: ILoginReq, res) => {
  const { iitkEmail, password } = req.body;
  const student = await StudentService.login(iitkEmail, password);
  const profile = await StudentService.getProfile(student);
  const token = StudentService.createToken(student);
  res.cookie('cz-token', token).send(profile);
});

interface IPingReq extends Request {}
export const checkToken = controller(async (req: IPingReq, res) => {
  const token = req.cookies['cz-token'];
  const payload = decodeToken(token);
  // @ts-ignore
  const student = await StudentService.get(payload._id);
  res.send(pick(student.toObject(), ['_id', 'iitkEmail', 'courses', 'name']));
});
