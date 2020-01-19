import { request } from '../utils';

export const getAllCourses = async () => {
  const res = await request('GET', '/courses/all');
  return res;
};

export const createNewCourse = async ({ name, code }) => {
  const res = await request('POST', '/courses/new', { name, code });
  return res;
};
