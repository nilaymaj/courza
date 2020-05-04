import { IStudent } from '../models/student';
import { ICourse } from '../models/course';
import Enrolment from '../models/enrolment';
import mng from 'mongoose';

/**
 * Enrols given student into given course
 */
export const joinCourse = async (
  student: IStudent,
  course: ICourse
): Promise<void> => {
  const enrl = new Enrolment({ student: student._id, course: course._id });
  await enrl.save();
  return;
};

/**
 * Deregisters student from course
 */
export const leaveCourse = async (
  student: IStudent,
  course: ICourse
): Promise<void> => {
  await Enrolment.deleteOne({ student: student._id, course: course._id });
  return;
};

/**
 * Get list of courses a student belongs to
 */
export const getStudentCourses = async (student: IStudent, lean = false) => {
  const enrls = await Enrolment.find({
    student: student._id,
  })
    .populate('course', ['_id', 'name', 'code'])
    .lean(lean);
  const courses = (<EnrlCourses[]>(<unknown>enrls)).map((e) => e.course);
  return courses;
};

type EnrlCourses = {
  _id: mng.Types.ObjectId;
  student: mng.Types.ObjectId;
  course: {
    _id: mng.Types.ObjectId;
    name: string;
    code: string;
  };
};
