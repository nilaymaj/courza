import { StudentService } from '../services';
import { Request } from 'express';
import { ICourse } from '../models/course';
import { IStudent } from '../models/student';
import { pick } from 'lodash';
import controller from './controller';

interface IJoinCourseReq extends Request {
  user: IStudent;
  course: ICourse;
}
export const joinCourse = controller(async (req: IJoinCourseReq, res) => {
  const { user, course } = req;
  const updated = await StudentService.joinCourse(user, course);
  return res.send(pick(updated, ['_id', 'iitkEmail', 'courses']));
});

interface IProfileReq extends Request {
  user: IStudent;
}
export const getProfile = controller(async (req: IProfileReq, res) => {
  const { user } = req;
  const data = await StudentService.getProfile(user);
  return res.send(data);
});

interface IFullProfileReq extends Request {
  user: IStudent;
}
export const getFullProfile = controller(async (req: IFullProfileReq, res) => {
  const { user } = req;
  const data = await StudentService.getFullProfile(user);
  return res.send(data);
});
