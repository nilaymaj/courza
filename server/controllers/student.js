import { StudentService } from '../services';
import { pick } from 'lodash';
import controller from './controller';

export const joinCourse = controller(async (req, res) => {
  const { user, course } = req;
  const updated = await StudentService.joinCourse(user, course);
  return res.send(pick(updated, ['_id', 'iitkEmail', 'courses']));
});

export const getProfile = controller(async (req, res) => {
  const { user } = req;
  const data = await StudentService.getProfile(user);
  return res.send(data);
});

export const getFullProfile = controller(async (req, res) => {
  const { user } = req;
  const data = await StudentService.getFullProfile(user);
  return res.send(data);
});
