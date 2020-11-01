import axios from 'axios';
type Method = 'POST' | 'GET' | 'PUT';

const request = async (method: Method, url: string, data?: any) => {
  const response = await axios({
    method,
    data,
    url: '/api' + url,
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
 * Create unverified account using email ID
 */
export const registerUnverified = async (iitkEmail: string) => {
  const res = await request('POST', '/auth/register', { iitkEmail });
  return res;
};

/**
 * Verify and create user account
 */
export const verifyAccount = async (
  token: string,
  name: string,
  rollNo: number,
  password: string
) => {
  const res = await request('POST', `/auth/verify?token=${token}`, {
    name,
    rollNo,
    password,
  });
  return res;
};

/**
 * Update user settings with the given patch
 */
export const updateUserSettings = async (patches: {}) => {
  const res = await request('PUT', '/students/settings', patches);
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

/**
 * Fetches the user's last pull timestamps for specified course
 */
export const getCourseTimestamps = async (courseId: string) => {
  const res = await request('GET', `/lastreads/all?courseId=${courseId}`);
  return res;
};

/**
 * Updates the last pull timestamp for specified thread to current date and time
 */
export const updateThreadTimestamp = async (threadId: string) => {
  const res = await request('PUT', `/lastreads/update?threadId=${threadId}`);
  return res;
};

/**
 * Enrol in specified course
 */
export const joinCourse = async (courseId: string) => {
  const res = await request('POST', '/enrol/join', { courseId });
  return res;
};

/**
 * Leave the specified course
 */
export const leaveCourse = async (courseId: string) => {
  const res = await request('POST', '/enrol/leave', { courseId });
  return res;
};
