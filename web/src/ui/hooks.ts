import * as React from 'react';
import { useHistory, matchPath } from 'react-router-dom';
import { Schema } from 'yup';
import { useActiveCourse } from '../providers/route';

/**
 * Custom hook for setting page title for current screen
 */
export const usePageTitle = (title: string) => {
  React.useEffect(() => {
    document.title = title;
  }, [title]);
};

type FieldValue = boolean | string | number;

/**
 * Custom hook for easily validating form fields
 * and maintain value and error states
 */
export const useFormField = <T extends FieldValue>(
  defaultVal: T,
  validator: Schema<T>
) => {
  const [data, setData] = React.useState<T>(defaultVal);
  const [error, setError] = React.useState<string | null>(null);
  const [first, setFirst] = React.useState<boolean>(true);

  // Validate and set error on data change
  React.useEffect(() => {
    (async () => {
      if (!first) {
        try {
          await validator.validate(data);
          setError(null);
        } catch (err) {
          setError(err.message);
        }
      }
    })();
    // eslint-disable-next-line
  }, [data, validator]);

  // Neutralize above effect on first mount
  React.useEffect(() => {
    setError(null);
    setFirst(false);
  }, []);

  return [data, setData, error] as const;
};

/**
 * Parses current location using react-router's matchPath
 * to return current course ID and thread ID
 */
export const useStateFromRoute = (): RouteState => {
  const history = useHistory();
  const matchURLs = [
    '/home/c/:courseId/:threadId',
    '/home/c/:courseId',
    '/home',
  ];
  let data;
  for (const url of matchURLs) {
    data = matchPath(history.location.pathname, { path: url });
    if (data) break;
  }

  // TODO: Fix this please
  // @ts-ignore
  if (data.params.threadId === 'resources') data.params.resourcesOpen = true;
  // @ts-ignore
  return data && data.params;
};

/**
 * Custom hook that provides functions for navigating across
 * the app and accordingly updating Redux state
 */
export const useAppNavigator = () => {
  const activeCourseId = useActiveCourse()?._id;
  const history = useHistory();

  const goToThread = React.useCallback(
    (threadId: string, courseId?: string): void => {
      if (!courseId) courseId = activeCourseId;
      if (!courseId) return;
      history.push(`/home/c/${courseId}/${threadId}`);
    },
    [history, activeCourseId]
  );

  const goToCourse = React.useCallback(
    (courseId: string): void => {
      history.push(`/home/c/${courseId}`);
    },
    [history]
  );

  const goToResources = React.useCallback(() => {
    history.push(`/home/c/${activeCourseId}/resources`);
  }, [history, activeCourseId]);

  const goToHome = React.useCallback((): void => {
    history.push(`/home`);
  }, [history]);

  return { goToThread, goToCourse, goToHome, goToResources };
};

type RouteState = {
  courseId?: string;
  threadId?: string;
  resourcesOpen?: boolean;
};
