import { omit } from 'lodash';
import { Router, Request } from 'express';
import * as AuthService from '../services/authService';
import controller from './controller';
const router = Router();

// Register new student
interface IRegisterReq extends Request {
  body: { name: string; iitkEmail: string; rollNo: number; password: string };
}
router.post(
  '/register',
  controller(async (req: IRegisterReq, res) => {
    const student = await AuthService.register(req.body);
    return res.send(omit(student.toObject(), ['__v', 'password']));
  })
);

// Student login
interface ILoginReq extends Request {
  body: { iitkEmail: string; password: string };
}
router.post(
  '/login',
  controller(async (req: ILoginReq, res) => {
    const { iitkEmail, password } = req.body;
    const student = await AuthService.login(iitkEmail, password);
    const token = AuthService.getToken(student);
    const profile = student.getInfo();
    res
      .cookie('cz-token', token, {
        sameSite: 'none',
      })
      .send(profile);
  })
);

export default router;
