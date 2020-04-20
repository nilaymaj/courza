import { request } from '../utils/base';

export const viewAllChats = async (courseId) => {
  const res = await request('POST', '/chats/all', { courseId });
  return res;
};
