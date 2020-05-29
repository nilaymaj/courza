import { Request, Router } from 'express';
import { IStudent } from '../models/student';
import { ICourse } from '../models/course';
import * as ResourceService from '../services/resourceService';
import controller from './controller';
import upload from '../middleware/file';
import fs from 'fs';
const router = Router();

// Test route
interface IUploadPdfReq extends Request {
  course: ICourse;
  user: IStudent;
  body: {
    name: string;
    description: string;
    file: {} /* File */;
  };
}
router.post(
  '/test',
  upload.single('file'),
  controller(async (req: IUploadPdfReq, res) => {
    const { user, course, file } = req;
    const { name, description } = req.body;
    console.log(user, course);
    const resource = await ResourceService.uploadPdfResource(
      user,
      course,
      { name, description },
      file
    );
    fs.unlink(req.file.path, (err) => {
      if (err) console.log(err);
      else console.log('Deleted file');
    });
    res.send(resource);
  })
);

export default router;
