// @flow
import { Course, Student } from '../models';
import * as ChatService from './chatService';
import * as StudentService from './studentService';
import { NotFoundError, DuplicateError } from '../utils/errors';
import { validate } from '../utils/validator';
import { newCourseValidator } from '../validators';

/**
 * Creates new course in database
 *
 * @param {Object} data Object with name, code and creator
 * @returns {Promise} Newly created course object
 */
export const create = async (data: {
  name: string,
  code: string,
  creator: Student,
}): Promise<Course> => {
  validate(data, newCourseValidator);
  const course = new Course({
    ...data,
    creatorId: data.creator._id,
  });
  await course.save();
  await StudentService.joinCourse(data.creator, course);
  return course;
};

/**
 * Finds and returns new Course object
 *
 * @param {string} courseId ID of the course
 * @returns {Promise} Course object
 */
export const get = async (courseId: string): Promise<Course> => {
  const course = await Course.findById(courseId);
  if (!course) throw new NotFoundError('Course does not exist.');
  return course;
};

/**
 * Returns array of all Course objects in database
 *
 * @returns {Promise} Promise, resolves with array of Course objects
 */
export const getAll = async (): Promise<Course[]> => {
  const arr = await Course.aggregate([
    { $project: { name: 1, code: 1, numOfStudents: { $size: '$students' } } },
  ]);
  return arr;
};

/**
 * Creates new course chat
 *
 * @param {Course} course Course object
 * @param {Object} data Object with title and creatorId of chat
 * @returns {Promise} Updated course object
 */
export const createNewChat = async (
  course: Course,
  data: { title: string, creatorId: string }
): Promise<Course> => {
  const chat = await ChatService.create({ ...data, courseId: course._id });
  const chatId = chat._id.toString();
  course.chats.push(chatId);
  await course.save();
  return chat;
};

/**
 * INTERNAL FUNCTION
 *
 * Add new student to the course (does not update student object)
 *
 * @param {Course} course Course object
 * @param {Student} student Student object
 * @returns {Promise} Updated course object
 */
export const addNewStudent = async (
  course: Course,
  student: Student
): Promise<Course> => {
  if (course.students.includes(student._id))
    throw new DuplicateError('Student already in course');

  course.students.push(student._id);
  await course.save();
  return course;
};
