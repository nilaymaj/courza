import { animateScroll, scroller } from 'react-scroll';
import mdIt from 'markdown-it';
import mdSlack from 'markdown-it-slack';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { postMessage, getChatMessages } from '../../utils/requests';
import { getProfile, getActiveChat } from '../../redux/selectors';
import { Profile, Chat } from '../../types';

// Type for fetched message
export type RawMessage = {
  author: {
    name: string;
    _id: string;
  };
  chatId: string;
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
 * Converts plaintext with newline '\n's to JSX
 *
 * @param {string} content Plaintext
 * @returns {Array<React.Node>} Corresponding JSX
 */
export const parseContentToJsx = (content: string): string => {
  const md = mdIt({ breaks: true, linkify: true });
  md.block.ruler.enableOnly(['paragraph']);
  md.use(mdSlack);
  const result = md.render(content);
  return result;
};

/**
 * Custom hook for managing chat message list,
 * including creating and validating optimistic messages
 */
export const useMessageManager = () => {
  const profile = useSelector(getProfile) as Profile;
  const chatId = (useSelector(getActiveChat) as Chat)._id;
  const [messages, setMessages] = React.useState<Array<UIMessage>>([]);
  const [tempMessages, setTempMessages] = React.useState<Array<UIMessage>>([]);
  const tempMessageId = React.useRef<number>(1);

  /**
   * Fetch chat messages and initiate message manager
   */
  const initMessages = React.useCallback(async (): Promise<void> => {
    const initMs = await getChatMessages(chatId);
    const parsedMs = (initMs as RawMessage[]).map((m) =>
      parseToUIMessage(m, profile._id)
    );
    setMessages(parsedMs);
  }, [chatId, profile._id]);

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
      const actualMessage = await postMessage(chatId, content);
      const updMessage = { ...message, _id: actualMessage._id };
      setTempMessages(tempMessages);
      setMessages([...messages, updMessage]);
    },
    [chatId, messages, tempMessages, profile._id, profile.name]
  );

  return {
    init: initMessages,
    messages: displayMessages,
    postNew: postNewMessage,
  };
};