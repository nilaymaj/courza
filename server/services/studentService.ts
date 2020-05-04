import Student, { IStudent } from '../models/student';
import { NotFoundError } from '../utils/errors';
import Course from '../models/course';

/**
 * Finds and returns Student object by ID
 */
export const get = async (studentId: string): Promise<IStudent> => {
  const student = await Student.findById(studentId);
  if (!student) throw new NotFoundError('Student does not exist.');
  return student;
};
