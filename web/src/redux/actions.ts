import { Course, Thread, Profile } from '../types';

export interface Login {
  type: 'LOGIN';
  courses: Course[];
  profile: Profile;
}

export interface OpenCourse {
  type: 'OPEN_COURSE';
  courseId: string;
}

export interface OpenThread {
  type: 'OPEN_CHAT';
  threadId: string;
}

export interface AddNewThread {
  type: 'ADD_NEW_CHAT';
  courseId: string;
  thread: Thread;
}

export interface SetLoading {
  type: 'SET_LOADING';
  loading: boolean;
}

export interface ResetActiveState {
  type: 'RESET_ACTIVE';
}

export type Action =
  | Login
  | OpenCourse
  | OpenThread
  | AddNewThread
  | SetLoading
  | ResetActiveState;

/**
 * Set login status to true with fetched profile
 */
export const login = (data: Profile & { courses: Course[] }): Login => {
  const { courses, ...profile } = data;
  return { type: 'LOGIN', courses, profile };
};

/**
 * Set active course ID
 */
export const openCourse = (courseId: string): OpenCourse => {
  return { type: 'OPEN_COURSE', courseId };
};

/**
 * Set active thread ID
 */
export const openThread = (threadId: string): OpenThread => {
  return { type: 'OPEN_CHAT', threadId };
};

/**
 * Add new thread to course with given ID
 */
export const addNewThread = (
  courseId: string,
  thread: Thread
): AddNewThread => {
  return { type: 'ADD_NEW_CHAT', courseId, thread };
};

/**
 * Set loading state
 */
export const setLoading = (loading: boolean): SetLoading => {
  return { type: 'SET_LOADING', loading };
};

/**
 * Reset active course and active thread to null
 */
export const resetActiveState = (): ResetActiveState => {
  return { type: 'RESET_ACTIVE' };
};
