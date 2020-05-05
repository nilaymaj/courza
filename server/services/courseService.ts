import Course, { ICourse } from '../models/course';
import { NotFoundError } from '../utils/errors';
import { validateCourse } from '../utils/validators';

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
  validateCourse(data);
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
export const get = async (courseId: string, lean = false) => {
  const course = await Course.findById(courseId).lean(lean);
  if (!course) throw new NotFoundError('Course does not exist.');
  return course;
};

/**
 * Returns array of all Course objects in database
 *
 * @returns Promise, resolves with array of Course objects
 */
export const getAll = async (lean = false) => {
  const allCourses = await Course.find().lean(lean);
  return allCourses;
};
