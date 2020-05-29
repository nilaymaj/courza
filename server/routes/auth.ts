import { pick, omit } from 'lodash';
import { Router, Request } from 'express';
import * as AuthService from '../services/authService';
import * as StudentService from '../services/studentService';
import { decodeToken } from '../utils/token';
import controller from './controller';
import upload from '../middleware/file';
import fs from 'fs';
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
    res.cookie('cz-token', token).send(profile);
  })
);

// Ping request (only for testing, remove later)
interface IPingReq extends Request {}
router.get(
  '/ping',
  controller(async (req: IPingReq, res) => {
    const token = req.cookies['cz-token'];
    const payload = decodeToken(token);
    const student = await StudentService.get(payload._id.toString());
    res.send(pick(student.toObject(), ['_id', 'iitkEmail', 'courses', 'name']));
  })
);

// AWS upload request (only for testing, remove later)
interface IUploadTestReq extends Request {}
router.post(
  '/testupload',
  upload.single('image'),
  controller(async (req: IUploadTestReq, res) => {
    console.log(req.file);
    res.send('Done?');
    fs.unlink(req.file.path, (err) => {
      if (err) console.log(err);
      else console.log('Deleted file');
    });
  })
);

export default router;
