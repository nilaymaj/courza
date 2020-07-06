import { Request, Router } from 'express';
import { IStudent } from '../models/student';
import { ICourse } from '../models/course';
import * as ResourceService from '../services/resourceService';
import { Metafile } from '../types';
import controller from './controller';
import upload from '../middleware/file';
import fs from 'fs';
import { objectify } from '../middleware';
const router = Router();

// Upload a PDF resource
interface IUploadPdfReq extends Request {
  course: ICourse;
  user: IStudent;
  file: Metafile;
  body: {
    name: string;
  };
}
router.post(
  '/new',
  upload.single('file'),
  objectify,
  controller(async (req: IUploadPdfReq, res) => {
    const { user, course, file } = req;
    const { name } = req.body;
    const resource = await ResourceService.uploadPdf(user, course, name, file);
    fs.unlink(req.file.path, (err) => {
      if (err) console.log(err);
      else console.log('Deleted file');
    });
    res.send(resource);
  })
);

// View all course resources
interface IViewResourcesReq extends Request {
  course: ICourse;
}
router.post(
  '/all',
  controller(async (req: IViewResourcesReq, res) => {
    const resources = await ResourceService.getAll(req.course, true);
    res.send(resources);
  })
);

export default router;
