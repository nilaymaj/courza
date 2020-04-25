// @flow
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { openChat, openCourse } from '../redux/actions';
import { getActiveCourse } from '../redux/selectors';

type FieldValue = boolean | string | number;

/**
 * Custom hook for easily validating form fields
 * and maintain value and error states
 */
export const useFormField = (defaultVal: FieldValue, validator: Object) => {
  const [data, setData] = React.useState<FieldValue>(defaultVal);
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

  return [data, setData, error];
};

/**
 * Custom hook that provides functions for navigating across
 * the app and accordingly updating Redux state
 */
export const useAppNavigator = () => {
  const dispatch = useDispatch();
  const activeCourse = useSelector(getActiveCourse);
  const history = useHistory();

  const goToChat = React.useCallback(
    (chatId: string, courseId?: string): void => {
      if (!courseId) courseId = activeCourse._id;
      dispatch(openChat(chatId));
      history.push(`/home/c/${courseId}/${chatId}`);
    },
    [dispatch, history, activeCourse._id]
  );

  const goToCourse = React.useCallback(
    (courseId: string): void => {
      dispatch(openCourse(courseId));
      history.push(`/home/c/${courseId}`);
    },
    [dispatch, history]
  );

  const goToHome = React.useCallback((): void => {
    history.push(`/home`);
  }, [history]);

  return { goToChat, goToCourse, goToHome };
};
