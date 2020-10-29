import { Request, Router } from 'express';
import { IStudent } from '../models/student';
import { StudentService } from '../services';
import controller from './controller';
const router = Router();

// Get student's profile
interface IProfileReq extends Request {
  user: IStudent;
  body: {};
}
router.get(
  '/profile',
  controller(async (req: IProfileReq, res) => {
    const { user } = req;
    return res.send(user.getInfo());
  })
);

// Update profile settings
interface IUpdateSettingsReq extends Request {
  user: IStudent;
  body: {};
}
router.put(
  '/settings',
  controller(async (req: IUpdateSettingsReq, res) => {
    const student = await StudentService.updateSettings(req.user, req.body);
    return res.send(student);
  })
);

export default router;
