// @flow
import { animateScroll, scroller } from 'react-scroll';
import * as React from 'react';
import mdIt from 'markdown-it';
import mdSlack from 'markdown-it-slack';

// Type for fetched message
export type RawMessage = {|
  author: {
    name: string,
    _id: string,
  },
  chatId: string,
  content: string,
  createdAt: string,
  updatedAt: string,
  votes: number,
  _id: string,
|};

// Type for message object used in UI
export type UIMessage = {|
  author: { _id: string, name: string },
  _id?: string,
  tempId?: string,
  content: string,
  date: Date,
  isOwn: boolean,
|};

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
  profile: { name: string, _id: string },
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
export const parseContentToJsx = (content: string): Array<React.Node> => {
  const md = mdIt({ breaks: true, linkify: true });
  md.block.ruler.enableOnly(['paragraph']);
  md.use(mdSlack);
  const result = md.render(content);
  return result;
};
