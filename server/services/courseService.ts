import Course, { ICourse, ICourseInfo } from '../models/course';
import { IStudent } from '../models/student';
import * as ChatService from './chatService';
import { NotFoundError } from '../utils/errors';
import { validate } from '../utils/validator';
import { newCourseValidator, newChatValidator } from '../validators';
import Chat, { IChat } from '../models/chat';

/**
 * Creates new course in database
 *
 * @param {Object} data Object with name, code and creator
 * @returns Newly created course object
 */
export const create = async (data: {
  name: string;
  code: string;
}): Promise<ICourse> => {
  validate(data, newCourseValidator);
  const course = new Course(data);
  await course.save();
  return course;
};

/**
 * Finds and returns new Course object
 *
 * @param {string} courseId ID of the course
 * @returns Course object
 */
export const get = async (courseId: string): Promise<ICourse> => {
  const course = await Course.findById(courseId);
  if (!course) throw new NotFoundError('Course does not exist.');
  return course;
};

/**
 * Returns array of all Course objects in database
 *
 * @returns Promise, resolves with array of Course objects
 */
export const getAll = async (): Promise<ICourseInfo[]> => {
  const allCourses = await Course.find();
  const arr = allCourses.map((c) => c.getInfo());
  return arr;
};

/**
 * Creates new course chat
 *
 * @param {ICourse} course Course object
 * @param {Object} data Object with title and creatorId of chat
 * @returns Newly create chat object
 */
export const createNewChat = async (
  course: ICourse,
  data: { title: string; creator: string }
): Promise<IChat> => {
  validate(data, newChatValidator);
  const chat = new Chat({ ...data, course: course._id.toString() });
  course.chats.push(chat._id);
  await Promise.all([chat.save(), course.save()]);
  return chat;
};
