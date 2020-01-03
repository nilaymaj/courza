// @flow
import { Course, Student } from '../models';
import ChatService from './chatService';
import { NotFoundError } from '../utils/errors';
import { validate } from '../utils/validator';
import { newCourseValidator } from '../validators';

export default class CourseService {
  /**
   * Creates new course in database
   *
   * @param {Object} data Object with name, code and creatorId
   * @returns {Promise} Newly created course object
   */
  static async create(data: { name: string, code: string, creatorId: string }): Promise<Course> {
    validate(data, newCourseValidator);
    const course = new Course({
      ...data,
      students: [data.creatorId]
    });
    await course.save();
    return course;
  }

  /**
   * Finds and returns new Course object
   *
   * @param {string} courseId ID of the course
   * @returns {Promise} Course object
   */
  static async get(courseId: string): Promise<Course> {
    const course = await Course.findById(courseId);
    if (!course) throw new NotFoundError('Course does not exist.');
    return course;
  }

  /**
   * Returns array of all Course objects in database
   *
   * @returns {Promise} Promise, resolves with array of Course objects
   */
  static async viewAll(): Promise<Course[]> {
    const arr = await Course.find();
    return arr;
  }

  /**
   * Creates new course chat
   *
   * @param {Course} course Course object
   * @param {Object} data Object with title and creatorId of chat
   * @returns {Promise} Updated course object
   */
  static async createNewChat(course: Course, data: { title: string, creatorId: string }): Promise<Course> {
    const chat = await ChatService.create({ ...data, courseId: course._id });
    const chatId = chat._id.toString();
    course.chats.push(chatId);
    await course.save();
    return chat;
  }

  /**
   * INTERNAL FUNCTION
   *
   * Add new student to the course (does not update student object)
   *
   * @param {Course} course Course object
   * @param {Student} student Student object
   * @returns {Promise} Updated course object
   */
  static async addNewStudent(course: Course, student: Student): Promise<Course> {
    if (course.students.includes(student._id)) throw new Error('Student already in course');

    course.students.push(student._id);
    await course.save();
    return course;
  }
}
