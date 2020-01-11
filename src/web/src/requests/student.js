import { request } from '../utils';
import axios from 'axios';

// export const getProfile = async () => request('GET', '/students/profile');

export const getProfile = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/students/profile');
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
