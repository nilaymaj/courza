import axios from 'axios';
import { Resource } from '../types';
type Method = 'POST' | 'GET';

const request = async (method: Method, url: string, data?: any) => {
  const response = await axios({
    method,
    data,
    url,
    withCredentials: true,
  });
  return response.data;
};

export const viewAllThreads = async (courseId: string) => {
  const res = await request('GET', `/threads/all?courseId=${courseId}`);
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

export const getThreadMessages = async (threadId: string) => {
  const res = await request('GET', `/messages/all?threadId=${threadId}`);
  return res;
};

export const postMessage = async (threadId: string, content: string) => {
  const res = await request('POST', '/messages/new', { threadId, content });
  return res;
};

export const createNewThread = async (
  courseId: string,
  title: string,
  description: string
) => {
  const res = await request('POST', '/threads/new', {
    courseId,
    title,
    description,
  });
  return res;
};

export const getAllCourseResources = async (
  courseId: string
): Promise<Resource[]> => {
  const res = await request('GET', `/resources/all?courseId=${courseId}`);
  return res;
};

export const postNewResource = async (
  courseId: string,
  name: string,
  file: File,
  category: string
) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('category', category);
  formData.append('courseId', courseId);
  formData.append('file', file);
  const res = await request('POST', '/resources/new', formData);
  return res;
};
