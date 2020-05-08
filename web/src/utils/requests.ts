import axios from 'axios';
type Method = 'POST' | 'GET';

const BASE_URL = process.env.COURZA_BASE_URL || 'http://localhost:8000/api';

const request = async (method: Method, url: string, data?: {}) => {
  const res = await axios({
    method,
    data,
    url: BASE_URL + url,
    withCredentials: true,
  });
  return res.data;
};

export const viewAllChats = async (courseId: string) => {
  const res = await request('POST', '/chats/all', { courseId });
  return res;
};

export const getAllCourses = async () => {
  const res = await request('GET', '/courses/all');
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

export const login = async (iitkEmail: string, password: string) => {
  const res = await request('POST', '/auth/login', {
    iitkEmail,
    password,
  });
  return res;
};

export const getChatMessages = async (chatId: string) => {
  const res = await request('POST', '/messages/all', { chatId });
  return res;
};

export const postMessage = async (chatId: string, content: string) => {
  const res = await request('POST', '/messages/new', { chatId, content });
  return res;
};
