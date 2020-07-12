import { Request, Router } from 'express';
import { IStudent } from '../models/student';
import { ICourse } from '../models/course';
import * as ResourceService from '../services/resourceService';
import { Metafile } from '../types';
import controller, { getByIdOrThrow } from './controller';
import upload from '../middleware/file';
import fs from 'fs';
const router = Router();

// Upload a PDF resource
interface IUploadPdfReq extends Request {
  user: IStudent;
  file: Metafile;
  body: {
    name: string;
    category: string;
    courseId: string;
  };
}
router.post(
  '/new',
  upload.single('file'),
  controller(async (req: IUploadPdfReq, res) => {
    const course = await getByIdOrThrow('Course', req.body.courseId);
    const resource = await ResourceService.uploadPdf(
      req.user,
      course,
      req.file,
      req.body
    );
    fs.unlink(req.file.path, (err) => {
      if (err) console.log(err);
      else console.log('Deleted file');
    });
    res.send(resource);
  })
);

// View all course resources
interface IViewResourcesReq extends Request {
  body: {};
  query: {
    courseId: string;
  };
}
router.get(
  '/all',
  controller(async (req: IViewResourcesReq, res) => {
    const course = await getByIdOrThrow('Course', req.query.courseId);
    const resources = await ResourceService.getAll(course, true);
    res.send(resources);
  })
);

export default router;
