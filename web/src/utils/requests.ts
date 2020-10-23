import axios from 'axios';
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

/**
 * Gets the list of courses student is enrolled in
 */
export const getStudentCourses = async () => {
  const res = await request('GET', '/enrol/view');
  return res;
};

/**
 * Get all threads of a particular course
 */
export const getCourseThreads = async (courseId: string) => {
  const res = await request('GET', `/threads/all?courseId=${courseId}`);
  return res;
};

/**
 * Get list of all courses on the platform
 */
export const getAllCourses = async () => {
  const res = await request('GET', '/courses/all');
  return res;
};

/**
 * Get student's profile
 */
export const getProfile = async () => {
  const res = await request('GET', '/students/profile');
  return res;
};

/**
 * Gets the full profile, including courses and threads
 * TODO: Remove this!
 */
export const getFullProfile = async () => {
  const res = await request('GET', '/students/fullprofile');
  return res;
};

/**
 * Login with the given email ID and password
 */
export const login = async (iitkEmail: string, password: string) => {
  const res = await request('POST', '/auth/login', {
    iitkEmail,
    password,
  });
  return res;
};

/**
 * Fetch all the messages of a thread
 */
export const getThreadMessages = async (threadId: string) => {
  const res = await request('GET', `/messages/all?threadId=${threadId}`);
  return res;
};

/**
 * Post a message on a particular thread
 */
export const postMessage = async (threadId: string, content: string) => {
  const res = await request('POST', '/messages/new', { threadId, content });
  return res;
};

/**
 * Create a new thread in a particular course
 */
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

/**
 * Fetch metadata about all resources of a course
 */
export const getAllCourseResources = async (
  courseId: string
): Promise<IResource[]> => {
  const res = await request('GET', `/resources/all?courseId=${courseId}`);
  return res;
};

/**
 * Post a new resource to a course
 */
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
