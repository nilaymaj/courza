// @flow
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { openChat, openCourse } from '../redux/actions';
import { getActiveCourse, getProfile, getActiveChat } from '../redux/selectors';
import {
  type UIMessage,
  createTempMessage,
  parseToUIMessage,
} from './chat-utils';
import { postMessage, getChatMessages } from './requests';

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

/**
 * Custom hook for managing chat message list,
 * including creating and validating optimistic messages
 *
 * @param {string} chatId Current chat
 * @returns {string} Description of the return type
 */
export const useMessageManager = () => {
  const profile = useSelector(getProfile);
  const chatId = useSelector(getActiveChat)._id;
  const [messages, setMessages] = React.useState<Array<UIMessage>>([]);
  const [tempMessages, setTempMessages] = React.useState<Array<UIMessage>>([]);
  const tempMessageId = React.useRef<number>(1);

  /**
   * Fetch chat messages and initiate message manager
   */
  const initMessages = React.useCallback(async (): Promise<void> => {
    const initMs = await getChatMessages(chatId);
    const parsedMs = initMs.map((m) => parseToUIMessage(m, profile._id));
    setMessages(parsedMs);
  }, [chatId, profile._id]);

  /**
   * Get list of messages to display to user
   */
  const getDisplayMessages = React.useCallback((): Array<UIMessage> => {
    return [...messages, ...tempMessages];
  }, [messages, tempMessages]);

  /**
   * Post new message
   */
  const postNewMessage = React.useCallback(
    async (content: string): Promise<void> => {
      // Optimistic UI - create and add unverified message
      const tId = (tempMessageId.current++).toString();
      const baseProfile = { _id: profile._id, name: profile.name };
      const message = createTempMessage(baseProfile, content, tId);
      setTempMessages([...tempMessages, message]);
      // Send request to server, update message ID from response
      const actualMessage = await postMessage(chatId, content);
      const updMessage = { ...message, _id: actualMessage._id };
      setTempMessages(tempMessages);
      setMessages([...messages, updMessage]);
    },
    [chatId, messages, tempMessages, profile._id, profile.name]
  );

  return [initMessages, getDisplayMessages, postNewMessage];
};
