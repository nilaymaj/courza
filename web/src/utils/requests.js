import { request } from './base';

export const viewAllChats = async (courseId) => {
  const res = await request('POST', '/chats/all', { courseId });
  return res;
};

export const getAllCourses = async () => {
  const res = await request('GET', '/courses/all');
  return res;
};

export const createNewCourse = async ({ name, code }) => {
  const res = await request('POST', '/courses/new', { name, code });
  return res;
};

export const getProfile = async () => {
  const res = await request('GET', '/students/profile');
  return res;
};

export const getFullProfile = async () => {
  const res = await request('GET', '/students/fullprofile');
  return res;
};

export const login = async ({ iitkEmail, password }) => {
  const res = await request('POST', '/auth/login', {
    iitkEmail,
    password,
  });
  return res;
};
