import * as React from 'react';
import { animateScroll, scroller } from 'react-scroll';
import mdIt from 'markdown-it';
import mdSlack from 'slack-markdown-it';
import mdEmoji from 'markdown-it-emoji';
import { useSelector } from 'react-redux';
import { postMessage, getThreadMessages } from '../../utils/requests';
import { getProfile } from '../../providers/redux/selectors';
import { useNewMessageEvent } from '../../realtime/hooks';
import twemoji from 'twemoji';
import { useActiveCourse, useActiveThread } from '../../providers/route';

// Type for fetched message
export type RawMessage = {
  author: {
    name: string;
    _id: string;
  };
  threadId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  votes: number;
  _id: string;
};

// Type for message object used in UI
export type UIMessage = {
  author: { _id: string; name: string };
  _id?: string;
  tempId?: string;
  content: string;
  date: Date;
  isOwn: boolean;
};

/**
 * Converts fetched message to UI format
 *
 * @param {RawMessage} rawMessage Fetched message object
 * @param {string} profileId User's profile ID
 * @returns {UIMessage} Message object for UI use
 */
export const parseToUIMessage = (
  rawMessage: RawMessage,
  profileId: string
): UIMessage => {
  const uiMessage = {
    author: rawMessage.author,
    _id: rawMessage._id,
    content: rawMessage.content,
    date: new Date(rawMessage.createdAt),
    isOwn: rawMessage.author._id === profileId,
  };
  return uiMessage;
};

/**
 * Creates a UIMessage for optimistically added messages
 *
 * @param {Object} profile Object with properties _id and name
 * @param {string} content Content of the message
 * @param {string} tempId Temporary id of the message
 * @returns {string} Description of the return type
 */
export const createTempMessage = (
  profile: { name: string; _id: string },
  content: string,
  tempId: string
): UIMessage => {
  return {
    author: {
      _id: profile._id,
      name: profile.name,
    },
    date: new Date(),
    content,
    tempId,
    isOwn: true,
  };
};

/**
 * Scrolls to the bottom of the message list
 *
 * @param {boolean} [instant] Set true if scroll should be instant
 */
export const scrollToBottom = (instant?: boolean) => {
  animateScroll.scrollToBottom({
    duration: instant ? 0 : 300,
    smooth: !instant,
    containerId: 'cz-messages__scroll',
  });
};

/**
 * Scrolls to message with provided ID
 *
 * @param {string} messageId ID of message to scroll to
 * @param {boolean} [instant] Set true if scroll should be instant
 */
export const scrollToMessage = (messageId: string, instant?: boolean) => {
  scroller.scrollTo(messageId, {
    duration: instant ? 0 : 200,
    smooth: !instant,
    containerId: 'cz-messages__scroll',
  });
};

/**
 * Converts markdown text with newline '\n's and
 * emoji-text to corresponding JSX
 *
 * @param {string} content Markdown plaintext
 * @returns {Array<React.Node>} Corresponding JSX
 */
export const parseContentToJsx = (content: string): string => {
  const md = mdIt({ breaks: true, linkify: true });
  md.use(mdSlack);
  md.use(mdEmoji);
  md.block.ruler.enableOnly(['paragraph']);
  md.renderer.rules.emoji = (token, idx) => twemoji.parse(token[idx].content);
  return md.render(content);
};

/**
 * Custom hook for managing thread message list,
 * including creating and validating optimistic messages
 */
export const useMessageManager = () => {
  const profile = useSelector(getProfile) as IProfile;
  const threadId = (useActiveThread() as IThread)._id;
  const courseId = (useActiveCourse() as ICourse)._id;
  const [messages, setMessages] = React.useState<Array<UIMessage>>([]);
  const [tempMessages, setTempMessages] = React.useState<Array<UIMessage>>([]);
  const tempMessageId = React.useRef<number>(1);

  useNewMessageEvent(
    courseId,
    (message) => {
      setMessages([...messages, parseToUIMessage(message, profile._id)]);
    },
    threadId
  );

  /**
   * Fetch thread messages and initiate message manager
   */
  const initMessages = React.useCallback(async (): Promise<void> => {
    const initMs = await getThreadMessages(threadId);
    const parsedMs = (initMs as RawMessage[]).map((m) =>
      parseToUIMessage(m, profile._id)
    );
    setMessages(parsedMs);
  }, [threadId, profile._id]);

  /**
   * List of messages to display to user
   */
  const displayMessages = React.useMemo(() => {
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
      const actualMessage = await postMessage(threadId, content);
      const updMessage = { ...message, _id: actualMessage._id };
      setTempMessages(tempMessages);
      setMessages([...messages, updMessage]);
    },
    [threadId, messages, tempMessages, profile._id, profile.name]
  );

  return {
    init: initMessages,
    messages: displayMessages,
    postNew: postNewMessage,
  };
};
