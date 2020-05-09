import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, matchPath } from 'react-router-dom';
import { openChat, openCourse, resetActiveState } from '../redux/actions';
import { getActiveCourse } from '../redux/selectors';
import { Schema } from 'yup';

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
 * to return current course ID and chat ID
 */
export const useStateFromRoute = (): RouteState => {
  const history = useHistory();
  const matchURLs = ['/home/c/:courseId/:chatId', '/home/c/:courseId', '/home'];
  let data;
  for (const url of matchURLs) {
    data = matchPath(history.location.pathname, { path: url });
    if (data) break;
  }
  // @ts-ignore
  return data && data.params;
};

/**
 * Custom hook that provides functions for navigating across
 * the app and accordingly updating Redux state
 */
export const useAppNavigator = () => {
  const dispatch = useDispatch();
  const activeCourse = useSelector(getActiveCourse);
  const history = useHistory();
  const cId = activeCourse && activeCourse._id;

  const goToChat = React.useCallback(
    (chatId: string, courseId?: string): void => {
      if (!courseId) courseId = cId;
      if (!courseId) return;
      dispatch(openChat(chatId));
      history.push(`/home/c/${courseId}/${chatId}`);
    },
    [dispatch, history, cId]
  );

  const goToCourse = React.useCallback(
    (courseId: string): void => {
      dispatch(openCourse(courseId));
      history.push(`/home/c/${courseId}`);
    },
    [dispatch, history]
  );

  const goToHome = React.useCallback((): void => {
    dispatch(resetActiveState());
    history.push(`/home`);
  }, [dispatch, history]);

  return { goToChat, goToCourse, goToHome };
};

type RouteState = {
  courseId?: string;
  chatId?: string;
};
