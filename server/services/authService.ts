import { hash, compareHash } from '../utils/base';
import Student, { IStudent } from '../models/student';
import VerificationTicket, {
  IVerificationTicket,
} from '../models/verification-ticket';
import {
  NotFoundError,
  CredentialsError,
  DuplicateError,
} from '../utils/errors';
import { sendVerificationMail } from '../utils/email';

/**
 * Creates a verification ticket for the user, and sends a
 * verification link to the user's email ID.
 */
export const registerUnverified = async (
  iitkEmail: string
): Promise<IVerificationTicket> => {
  let ticket = await VerificationTicket.findOne({ iitkEmail });
  if (ticket) throw new DuplicateError('Verification ticket already exists');

  ticket = new VerificationTicket({ iitkEmail });
  await ticket.save();
  await sendVerificationMail(iitkEmail, ticket.uniqueToken);
  return ticket.toObject();
};

/**
 * Verify and create user account with given data
 */
export const verifyUserAccount = async (
  uniqueToken: string,
  data: { name: string; rollNo: number; password: string }
): Promise<IStudent> => {
  const ticket = await VerificationTicket.findOne({ uniqueToken });
  if (!ticket) throw new NotFoundError('Verification ticket not found');
  const iitkEmail = ticket.iitkEmail;

  const hashedPwd = await hash(data.password);
  const student = new Student({ ...data, password: hashedPwd, iitkEmail });
  await student.save();
  await ticket.remove();
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
