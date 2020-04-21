/**
 * Set login status to true with fetched profile
 */
export const login = (data) => {
  const { courses, ...profile } = data;
  return { type: 'LOGIN', courses, profile };
};

/**
 * Add new course to courses list
 */
export const addNewCourse = (data) => {
  const { id, name, course } = data;
  return { type: 'ADD_NEW_COURSE', id, name, course };
};

/**
 * Set active course ID
 */
export const openCourse = (courseId) => {
  return { type: 'OPEN_COURSE', courseId };
};

/**
 * Set active chat ID
 */
export const openChat = (chatId) => {
  return { type: 'OPEN_CHAT', chatId };
};

/**
 * Set loading state to true
 */
export const startLoading = (text) => {
  return { type: 'START_LOADING', text };
};

/**
 * Set loading state to false
 */
export const stopLoading = () => {
  return { type: 'STOP_LOADING' };
};

export default {
  login,
  addNewCourse,
  startLoading,
  stopLoading,
};
