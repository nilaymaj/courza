import * as Services from '../services';
import { connect } from 'mongoose';
import { DEV_DB_URL } from '../utils/constants';

const sampleStudents = [
  {
    name: 'John Doe',
    iitkEmail: 'one@iitk.ac.in',
    rollNo: 180001,
    password: 'abcdefgh',
  },
  {
    name: 'Luke Skywalker',
    iitkEmail: 'two@iitk.ac.in',
    rollNo: 180002,
    password: 'abcdefgh',
  },
];

const sampleCourses = [
  {
    name: 'Fundamentals of Programming',
    code: 'ESC101',
  },
  {
    name: 'Mathematics - I',
    code: 'MTH101',
  },
];

const sampleThreads = [
  {
    title: 'Any info about major quiz 1?',
    description: 'Does anyone have any information about major quiz 1?',
  },
  {
    title: 'Postpone the quiz',
    description:
      'We need to postpone the quiz to around a week after Antaragni, at least.',
  },
];

const sampleMessages = [
  { content: 'I think the prof said something in a class.' },
  { content: "Which one? I don't think I missed any classes" },
];

let db;

const populate = async () => {
  // Connect to database
  db = await connect(DEV_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  // Create students
  const student1 = await Services.AuthService.register(sampleStudents[0]);
  const student2 = await Services.AuthService.register(sampleStudents[1]);

  // Create courses
  const course1 = await Services.CourseService.create(sampleCourses[0]);
  const course2 = await Services.CourseService.create(sampleCourses[1]);

  // Enrol both students into both courses
  await Services.EnrolmentService.joinCourse(student1, course1);
  await Services.EnrolmentService.joinCourse(student1, course2);
  await Services.EnrolmentService.joinCourse(student2, course1);
  await Services.EnrolmentService.joinCourse(student2, course2);

  // Create both threads in first course
  const thread1 = await Services.ThreadService.createThread(
    course1,
    student1,
    sampleThreads[0].title,
    sampleThreads[0].description
  );
  const thread2 = await Services.ThreadService.createThread(
    course1,
    student2,
    sampleThreads[1].title,
    sampleThreads[1].description
  );

  // Add some messages in first thread
  await Services.MessageService.postNew(
    student2,
    thread1,
    sampleMessages[0].content
  );
  await Services.MessageService.postNew(
    student1,
    thread1,
    sampleMessages[1].content
  );
};

populate()
  .then(() => console.log('Populated database!'))
  .catch((err) => console.error('Could not populate database: ', err))
  .finally(() => db && db.disconnect());
