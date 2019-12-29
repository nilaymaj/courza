// @flow
import { Course, Student, Chat } from '../models';
import ChatService from './chatService';
import { toObjectID } from '../utils';

export class CourseService {
  /**
   * Creates new course in database
   *
   * @param {Object} data Object with name, code and creatorId of course
   * @returns {Course} Newly created course object
   */
  static async create(data: {
    name: string,
    code: string,
    creatorId: string
  }): Course {
    const course = new Course({
      ...data,
      students: [toObjectID(data.creatorId)]
    });
    await course.save();
    return course;
  }

  /**
   * Creates new course chat
   *
   * @param {string} courseId ID of the course
   * @param {Object} data Object with title and creatorId of chat
   * @returns {Object} Updated course object
   */
  static async createNewChat(
    courseId: string,
    data: { title: string, creatorId: string }
  ): Chat {
    const course = await Course.findById(courseId);
    if (!course) throw new Error('Course does not exist.');

    const chat = await ChatService.create({ ...data, courseId });
    const chatId = chat._id.toString();
    course.chats.push(chatId);
    await course.save();
    return chat;
  }

  /**
   * Add new student to the course (does not update student object)
   *
   * @param {string} courseId ID of the course
   * @param {string} studentId ID of the new student
   * @returns {Course} Updated course object
   */
  static async addNewStudent(courseId: string, studentId: string): Course {
    const course = await Course.findById(courseId);
    if (!course) throw new Error('Course does not exist.');

    const student = await Student.findById(studentId);
    if (!student) throw new Error('Student does not exist.');

    if (course.students.includes(student._id))
      throw new Error('Student already in course');

    course.students.push(student._id);
    await course.save();
    return course;
  }
}
