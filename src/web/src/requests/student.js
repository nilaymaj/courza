import { request } from '../utils';

export const getProfile = async () => {
  try {
    const res = await request('GET', '/students/profile');
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const login = async ({ iitkEmail, password }) => {
  try {
    const res = await request('POST', '/auth/login', {
      iitkEmail,
      password
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
