// @flow
const { pick } = require('lodash');
const { Student, Course } = require('../models');
const { hash, compareHash } = require('../utils/base');
const { generateToken } = require('../utils/token');
const CourseService = require('./courseService');
const { NotFoundError, CredentialsError } = require('../utils/errors');

/**
 * Creates new student object in database
 *
 * @param {Object} data Object containing name, iitkEmail, rollNo and password
 * @returns {Student} Newly created student object
 */
exports.create = async function create(data: {
  name: string,
  iitkEmail: string,
  rollNo: Number,
  password: string
}): Student {
  const hashedPwd = await hash(data.password);
  const student = new Student({ ...data, password: hashedPwd });
  await student.save();
  return student;
};

/**
 * Finds and returns Student object by ID
 *
 * @param {string} studentId ID of the student
 * @returns {Student} Student object
 */
exports.get = async function get(studentId: string): Student {
  const student = await Student.findById(studentId);
  if (!student) throw new NotFoundError('Student does not exist.');
  return student;
};

/**
 * Checks if given credentials are correct, and returns student object if so
 *
 * @param {string} iitkEmail IITK email ID
 * @param {string} password Plaintext password
 * @returns {Student} Student object (or null, if password does not match)
 */
exports.login = async function login(iitkEmail: string, password: string): ?Student {
  const student = await Student.findOne({ iitkEmail });
  if (!student) throw new NotFoundError('Student does not exist.');

  const match = await compareHash(password, student.password);
  if (!match) throw new CredentialsError('Password does not match.');
  const token = generateToken(pick(student, ['_id', 'iitkEmail']));
  return token;
};

/**
 * Adds student to course (updates course object)
 *
 * @param {Student} student Student object to be added
 * @param {Course} course Course to add the student to
 * @returns {Student} Updated student object
 */
exports.joinCourse = async function joinCourse(student: Student, course: Course): Student {
  await CourseService.addNewStudent(course, student);
  student.courses.push(course._id);
  await student.save();
  return student;
};

/**
 * Returns basic info of the student, including courses' info
 *
 * @param {Student} student Student object
 * @returns {Object} Basic info, with courses' info
 */
exports.getProfile = async function getProfile(student: Student): Student {
  const courses = await Course.find({ _id: { $in: student.courses } }).lean();
  const plainCourses = courses.map(c => pick(c, ['_id', 'name', 'code']));
  return { ...pick(student, ['_id', 'name', 'iitkEmail', 'rollNo']), courses: plainCourses };
};
