// @flow
import Poll from '../models/poll';
import { Student } from '../models/student';
import { remove } from 'lodash';

export default class PollService {
  /**
   * Creates new Poll object (does not update course)
   *
   * @param {Object} data Object with courseId, description and optionsText (Array<String>)
   * @returns {Object} Newly created poll object
   */
  static async create(data: {
    courseId: string,
    description: string,
    optionsText: Array<string>
  }): Poll {
    const { description, courseId, optionsText } = data;
    const options = optionsText.map(text => ({ text, students: [] }));
    const poll = new Poll({ description, courseId, options });
    await poll.save();
    return poll;
  }

  /**
   * Adds new or updates existing vote to the poll
   *
   * @param {string} pollId ID of the poll to be voted in
   * @param {Object} data Object with studentId and option no.
   * @returns {Poll} Updated poll object
   */
  static async poll(
    pollId: string,
    data: { studentId: string, option: number }
  ): Poll {
    const poll = await Poll.findById(pollId);
    if (!poll) throw new Error('Poll does not exist.');

    const student = await Student.findById(data.studentId);
    if (!student) throw new Error('Student does not exist.');

    const studentVotes = poll.options[data.option];
    remove(studentVotes, id => id === student._id);
    poll.options[data.option].push(student._id);
    await poll.save();
    return poll;
  }
}
