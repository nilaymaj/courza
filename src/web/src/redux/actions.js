export const login = data => {
  const { courses, ...profile } = data;
  return { type: 'LOGIN', courses, profile };
};

export const addNewCourse = data => {
  const { id, name, course } = data;
  return { type: 'ADD_NEW_COURSE', id, name, course };
};

export const startLoading = text => {
  return { type: 'START_LOADING', text };
};

export const stopLoading = text => {
  return { type: 'STOP_LOADING' };
};

export default {
  login,
  addNewCourse,
  startLoading,
  stopLoading
};
