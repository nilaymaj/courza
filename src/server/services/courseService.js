// @flow
const { Course, Student } = require('../models');
const ChatService = require('./chatService');
const { NotFoundError } = require('../utils/errors');
const { validate } = require('../utils/validator');
const { newCourseValidator } = require('../validators');

/**
 * Creates new course in database
 *
 * @param {Object} data Object with name, code and creatorId
 * @returns {Promise} Newly created course object
 */
exports.create = async function create(data: { name: string, code: string, creatorId: string }): Promise<Course> {
  validate(data, newCourseValidator);
  const course = new Course({
    ...data,
    students: [data.creatorId]
  });
  await course.save();
  return course;
};

/**
 * Finds and returns new Course object
 *
 * @param {string} courseId ID of the course
 * @returns {Promise} Course object
 */
exports.get = async function get(courseId: string): Promise<Course> {
  const course = await Course.findById(courseId);
  if (!course) throw new NotFoundError('Course does not exist.');
  return course;
};

/**
 * Returns array of all Course objects in database
 *
 * @returns {Promise} Promise, resolves with array of Course objects
 */
exports.viewAll = async function viewAll(): Promise<Course[]> {
  const arr = await Course.find();
  return arr;
};

/**
 * Creates new course chat
 *
 * @param {Course} course Course object
 * @param {Object} data Object with title and creatorId of chat
 * @returns {Promise} Updated course object
 */
exports.createNewChat = async function createNewChat(
  course: Course,
  data: { title: string, creatorId: string }
): Promise<Course> {
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
exports.addNewStudent = async function addNewStudent(course: Course, student: Student): Promise<Course> {
  if (course.students.includes(student._id)) throw new Error('Student already in course');

  course.students.push(student._id);
  await course.save();
  return course;
};
