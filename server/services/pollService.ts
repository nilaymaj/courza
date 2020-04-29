// @flow
import Poll, { IPoll } from '../models/poll';
import { remove } from 'lodash';
import { IStudent } from '../models/student';
import { NotFoundError } from '../utils/errors';

/**
 * INTERNAL FUNCTION
 *
 * Creates new Poll object (does not update course)
 *
 * @param {Object} data Object with courseId, description and optionsText (Array<String>)
 * @returns {Poll} Newly created poll object
 */
export const create = async (data: {
  courseId: string;
  description: string;
  optionsText: Array<string>;
}): Promise<IPoll> => {
  const { description, courseId, optionsText } = data;
  const options = optionsText.map((text) => ({ text, students: [] }));
  const poll = new Poll({ description, courseId, options });
  await poll.save();
  return poll;
};

/**
 * Finds and returns Poll object by ID
 *
 * @param {string} pollId ID of the poll
 * @returns {Poll} Poll object
 */
export const get = async (pollId: string): Promise<IPoll> => {
  const poll = await Poll.findById(pollId);
  if (!poll) throw new NotFoundError('Poll does not exist.');
  return poll;
};

/**
 * Adds new or updates existing vote to the poll
 *
 * @param {string} pollId ID of the poll to be voted in
 * @param {Object} data Object with studentId and option no.
 * @returns {Poll} Updated poll object
 */
export const poll = async (
  poll: IPoll,
  data: { student: IStudent; option: number }
): Promise<IPoll> => {
  const studentVotes = poll.options[data.option].students;
  remove(studentVotes, (id) => id === data.student._id);
  studentVotes.push(data.student._id);
  await poll.save();
  return poll;
};
