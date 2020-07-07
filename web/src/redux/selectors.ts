import { Store } from './reducers';

export const getCourses = (store: Store) => store && store.courses;
export const getProfile = (store: Store) => store && store.profile;
export const isLoggedIn = (store: Store) => store && store.isLoggedIn;
export const isLoading = (store: Store) => store && store.loading;

export const getActiveCourse = (store: Store) => {
  if (!store) return;
  const courseId = store.activeCourseId;
  const course = store.courses.find((c) => c._id === courseId);
  return course;
};

export const getActiveThread = (store: Store) => {
  if (!store) return;
  const course = getActiveCourse(store);
  if (!course) return;
  const thread = course.threads.find((c) => c._id === store.activeThreadId);
  return thread;
};

export const getCourseThreads = (store: Store) => {
  if (!store) return;
  const course = getActiveCourse(store);
  if (!course) return;
  return course.threads;
};
