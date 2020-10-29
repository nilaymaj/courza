import { Router, Request } from 'express';
import * as AuthService from '../services/authService';
import controller from './controller';
const router = Router();

// Create a verification ticket for new account
interface IUnverifiedRegisterReq extends Request {
  body: { iitkEmail: string };
}
router.post(
  '/register',
  controller(async (req: IUnverifiedRegisterReq, res) => {
    const ticket = await AuthService.registerUnverified(req.body.iitkEmail);
    return res.send(ticket);
  })
);

// Verify, create user account and login
interface IVerifyAccountReq extends Request {
  body: {
    name: string;
    rollNo: number;
    password: string;
  };
  query: { token: string };
}
router.post(
  '/verify',
  controller(async (req: IVerifyAccountReq, res) => {
    const student = await AuthService.verifyUserAccount(
      req.query.token,
      req.body
    );

    // Directly login to the app
    const token = AuthService.getToken(student);
    const profile = student.getInfo();
    return res.cookie('cz-token', token).send(profile);
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
    res.cookie('cz-token', token).send(profile);
  })
);

export default router;
