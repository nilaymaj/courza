import * as React from 'react';
import { useHistory, matchPath } from 'react-router';
import CoursesContext from './course-provider';
import ThreadsContext from './thread-provider';

/**
 * Parses URL to get ID of currently active course
 */
export const useActiveCourseId = (): string | null => {
  const currentPath = useHistory().location.pathname;
  const match = matchPath(currentPath, { path: '/home/c/:courseId' });
  if (!match) return null;
  const courseId = (match.params as { courseId: string }).courseId;
  return courseId;
};

/**
 * Parses URL to get ID of currently active thread
 */
export const useActiveThreadId = (): string | null => {
  const currentPath = useHistory().location.pathname;
  const match = matchPath(currentPath, { path: '/home/c/:courseId/:threadId' });
  if (!match) return null;
  const threadId = (match.params as { threadId: string }).threadId;
  return threadId;
};

/**
 * Parses URL to get currently active course object
 */
export const useActiveCourse = (): ICourse | null => {
  const courseId = useActiveCourseId();
  const courses = React.useContext(CoursesContext).courses;
  if (!courseId) return null;
  const courseData = courses.find(({ course }) => course._id === courseId);
  return courseData ? courseData.course : null;
};

/**
 * Parses URL to get currently open thread object
 */
export const useActiveThread = (): IThread | null => {
  const threadId = useActiveThreadId();
  const threads = React.useContext(ThreadsContext).threads;
  if (!threadId) return null;
  const threadData = threads.find(({ thread }) => thread._id === threadId);
  return threadData ? threadData.thread : null;
};

/**
 * Parses URL to check if resources page is open
 */
export const useIsResourcesOpen = (): boolean => {
  const currentPath = useHistory().location.pathname;
  const match = matchPath(currentPath, { path: '/home/c/:courseId/resources' });
  return !!match;
};
