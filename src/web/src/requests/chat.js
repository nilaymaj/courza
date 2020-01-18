import { request } from '../utils';

export const viewAllChats = async courseId => {
  const res = await request('POST', '/chats/all', { courseId });
  return res;
};
