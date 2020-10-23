import * as React from 'react';
import { useHistory, matchPath } from 'react-router';
import { CoursesContext } from './course-provider';
import { ThreadsContext } from './thread-provider';

/**
 * Parses URL to get currently active course
 */
export const useActiveCourse = (): ICourse | null => {
  const history = useHistory();
  const courses = React.useContext(CoursesContext).courses;
  const currentPath = history.location.pathname;

  // TODO: This hook is called too many times - check why.
  const match = matchPath(currentPath, { path: '/home/c/:courseId' });
  if (!match) return null;
  const courseId = (match.params as { courseId: string }).courseId;
  const courseData = courses.find(({ course }) => course._id === courseId);
  return courseData ? courseData.course : null;
};

/**
 * Parses URL to get currently open thread
 */
export const useActiveThread = (): IThread | null => {
  const history = useHistory();
  const threads = React.useContext(ThreadsContext).threads;
  const currentPath = history.location.pathname;

  const match = matchPath(currentPath, { path: '/home/c/:courseId/:threadId' });
  if (!match) return null;
  const threadId = (match.params as { threadId: string }).threadId;
  const threadData = threads.find(({ thread }) => thread._id === threadId);
  return threadData ? threadData.thread : null;
};

/**
 * Parses URL to check if resources page is open
 */
export const useIsResourcesOpen = (): boolean => {
  const history = useHistory();
  const currentPath = history.location.pathname;

  const match = matchPath(currentPath, { path: '/home/c/:courseId/resources' });
  return !!match;
};
