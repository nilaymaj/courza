export const getCourses = (store) => store && store.courses;
export const getProfile = (store) => store && store.profile;
export const isLoggedIn = (store) => store && store.isLoggedIn;
export const isLoading = (store) => store && store.loadingText;
export const isSidebarOpen = (store) => store && store.sidebarOpen;

export const getActiveCourse = (store) => {
  if (!store) return;
  const courseId = store.activeCourseId;
  const course = store.courses.find((c) => c._id === courseId);
  return course;
};

export const getActiveChat = (store) => {
  if (!store) return;
  const course = getActiveCourse(store);
  const chat = course.chats.find((c) => c._id === store.activeChatId);
  return chat;
};

export const getCourseChats = (store) => {
  if (!store) return;
  const course = getActiveCourse(store);
  return course.chats;
};

export default { getCourses, getProfile, isLoggedIn, isLoading };
