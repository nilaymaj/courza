// @flow
const { Chat } = require('../models');
const MessageService = require('./messageService');
const { NotFoundError } = require('../utils/errors');
const { newChatValidator } = require('../validators');
const { validate } = require('../utils/validator');

/**
 * Creates new chat in database (does not update course object)
 *
 * @param {Object} data Object containing title, courseId and creatorId
 * @returns {Chat} Newly created chat object
 */
exports.create = async function create(data: { title: string, courseId: string, creatorId: string }): Promise<Chat> {
  validate(data, newChatValidator);
  const chat = new Chat({ ...data, messages: [] });
  await chat.save();
  return chat;
};

/**
 * Finds and returns Chat object by ID
 *
 * @param {string} chatId ID of the chat
 * @returns {Chat} Chat object
 */
exports.get = async function get(chatId: string): Promise<Chat> {
  const chat = await Chat.findById(chatId);
  if (!chat) throw new NotFoundError('Chat does not exist.');
  return chat;
};

/**
 * Returns all chats of a course
 *
 * @param {string} courseId ID of the course
 * @returns {Promise} Promise, resolves with Chat objects
 */
exports.getAll = async function getAll(courseId: string): Promise<Chat[]> {
  const chats = await Chat.find({ courseId });
  return chats;
};

/**
 * Updates the title of a chat
 *
 * @param {Chat} chat Chat object
 * @param {string} newTitle New title of the chat
 * @returns {Chat} Updated chat object
 */
exports.changeTitle = async function changeTitle(chat: Chat, newTitle: string): Promise<Chat> {
  chat.title = newTitle;
  await chat.save();
  return chat;
};

/**
 * Creates new message in chat
 *
 * @param {Chat} chat Chat object
 * @param {Object} data Object with authorId and body of message
 * @returns {Chat} Updated chat object
 */
exports.createNewMessage = async function createNewMessage(
  chat: Chat,
  data: {
    authorId: string,
    body: string
  }
): Promise<Chat> {
  const message = await MessageService.create({ ...data, chatId: chat._id });
  const messageId = message._id.toString();

  chat.messages.push(messageId);
  await chat.save();
  return chat;
};
