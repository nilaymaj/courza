import { Course, Profile } from '../types';

export interface Login {
  type: 'LOGIN';
  courses: Course[];
  profile: Profile;
}

export interface OpenCourse {
  type: 'OPEN_COURSE';
  courseId: string;
}

export interface OpenChat {
  type: 'OPEN_CHAT';
  chatId: string;
}

export interface SetLoading {
  type: 'SET_LOADING';
  loading: boolean;
}

export interface ToggleSidebar {
  type: 'TOGGLE_SIDEBAR';
  open?: boolean;
}

export type Action = Login | OpenCourse | OpenChat | SetLoading | ToggleSidebar;

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
 * Set active chat ID
 */
export const openChat = (chatId: string): OpenChat => {
  return { type: 'OPEN_CHAT', chatId };
};

/**
 * Set loading state
 */
export const setLoading = (loading: boolean): SetLoading => {
  return { type: 'SET_LOADING', loading };
};

/**
 * Sets sidebar toggle state
 * If `open` not provided, toggles sidebar
 */
export const toggleSidebar = (open?: boolean): ToggleSidebar => {
  return { type: 'TOGGLE_SIDEBAR', open };
};
