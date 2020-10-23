import { Request, Router } from 'express';
import { IStudent } from '../models/student';
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

export default router;
