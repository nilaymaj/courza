import { request } from '../utils/base';

export const getProfile = async () => {
  const res = await request('GET', '/students/profile');
  return res;
};

export const login = async ({ iitkEmail, password }) => {
  const res = await request('POST', '/auth/login', {
    iitkEmail,
    password,
  });
  return res;
};
