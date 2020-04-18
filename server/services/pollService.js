// @flow
const Poll = require('../models/poll');
const { remove } = require('lodash');
const { Student } = require('../models/student');
const { NotFoundError } = require('../utils/errors');

/**
 * INTERNAL FUNCTION
 *
 * Creates new Poll object (does not update course)
 *
 * @param {Object} data Object with courseId, description and optionsText (Array<String>)
 * @returns {Poll} Newly created poll object
 */
exports.create = async function create(data: {
  courseId: string,
  description: string,
  optionsText: Array<string>
}): Poll {
  const { description, courseId, optionsText } = data;
  const options = optionsText.map(text => ({ text, students: [] }));
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
exports.get = async function get(pollId: string): Poll {
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
exports.poll = async function poll(poll: Poll, data: { student: Student, option: number }): Poll {
  const studentVotes = poll.options[data.option];
  remove(studentVotes, id => id === data.student._id);
  poll.options[data.option].push(data.student._id);
  await poll.save();
  return poll;
};
