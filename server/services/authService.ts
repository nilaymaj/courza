import { hash, compareHash } from '../utils/base';
import Student, { IStudent } from '../models/student';
import { NotFoundError, CredentialsError } from '../utils/errors';

/**
 * Creates a new, unverified student in database
 */
export const register = async (data: {
  name: string;
  iitkEmail: string;
  rollNo: number;
  password: string;
}): Promise<IStudent> => {
  const hashedPwd = await hash(data.password);
  const student = new Student({ ...data, password: hashedPwd });
  await student.save();
  return student;
};

/**
 * Matches credentials and generates auth token
 */
export const login = async (
  iitkEmail: string,
  password: string
): Promise<IStudent> => {
  // Get student
  const student = await Student.findOne({ iitkEmail });
  if (!student) throw new NotFoundError('Student does not exist.');
  const match = await compareHash(password, student.password);
  if (!match) throw new CredentialsError('Password does not match.');
  return student;
};

/**
 * Generate auth token for given student
 */
export const getToken = (student: IStudent): string => {
  const token = student.generateToken();
  return token;
};
