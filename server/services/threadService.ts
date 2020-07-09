import Thread, { IThread } from '../models/thread';
import { ICourse } from '../models/course';
import { IStudent } from '../models/student';
import { validateThread } from '../utils/validators';
import { NotFoundError } from '../utils/errors';
import { postNew } from './messageService';
import Message from '../models/message';

/**
 * Creates a new thread in given course
 */
export const createThread = async (
  course: ICourse,
  student: IStudent,
  title: string,
  description: string
): Promise<IThread> => {
  validateThread({ title, description });
  const thread = new Thread({
    title: title,
    creator: student._id,
    course: course._id,
  });
  await thread.save();
  await postNew(student, thread, description);
  return thread;
};

/**
 * Find and return thread by ID
 */
export const get = async (threadId: string, lean = false) => {
  const thread = await Thread.findById(threadId).lean(lean);
  if (!thread) throw new NotFoundError('Thread does not exist');
  return thread;
};

/**
 * Returns list of all threads from a course
 */
export const getAll = async (course: ICourse, lean = false) => {
  const threads = await Thread.find({ course: course._id }).lean(lean);
  return threads;
};

/**
 * Changes the title of a thread
 */
export const renameThread = async (
  thread: IThread,
  title: string
): Promise<IThread> => {
  validateThread({ title }, true);
  thread.title = title;
  await thread.save();
  return thread;
};

/**
 * Deletes thread from database
 */
export const deleteThread = async (thread: IThread): Promise<void> => {
  await Message.deleteMany({ thread: thread._id });
  await thread.remove();
  return;
};