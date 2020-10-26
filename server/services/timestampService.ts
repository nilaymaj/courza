import UserTimestamp, { IUserTimestamp } from '../models/user-timestamp';
import { ICourse } from '../models/course';
import { IStudent } from '../models/student';
import { IThread } from '../models/thread';

/**
 * Returns all of the student's timestamps from a particular course.
 * Note that thread timestamps that do not exist will not be created automatically.
 */
export const getAllFromCourse = async (student: IStudent, course: ICourse) => {
  const timestamps = await UserTimestamp.find({
    student: student._id,
    course: course._id,
  }).lean(true);
  return timestamps;
};

/**
 * Updates a thread timestamp to current date and time.
 * If timestamp does not exist, it is automatically created.
 */
export const updateThread = async (
  student: IStudent,
  thread: IThread
): Promise<IUserTimestamp> => {
  let timestamp = await UserTimestamp.findOne({
    student: student._id,
    thread: thread._id,
  });
  if (!timestamp) {
    timestamp = new UserTimestamp({
      student: student._id,
      course: thread.course,
      thread: thread._id,
    });
  }

  timestamp.timestamp = new Date();
  await timestamp.save();
  return timestamp.toObject();
};
