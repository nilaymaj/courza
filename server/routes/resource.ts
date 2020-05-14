import { Request, Router } from 'express';
import { IStudent } from '../models/student';
import { ICourse } from '../models/course';
import controller from './controller';
const router = Router();

// Test route
interface ITestResourceReq extends Request {
  course: ICourse;
  student: IStudent;
  files: File[];
}
router.post(
  '/test',
  controller(async (req: ITestResourceReq, res) => {
    console.log(req.files);
  })
);
