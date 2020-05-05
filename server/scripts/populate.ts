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

const sampleChats = [
  { title: 'Any info about major quiz 1?' },
  { title: 'Postpone the quiz' },
];

const sampleMessages = [
  { content: 'Does anyone have any info about major quiz 1?' },
  { content: "Nope, I don't think so :(" },
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

  // Create both chats in first course
  const chat1 = await Services.ChatService.createChat(
    course1,
    student1,
    sampleChats[0].title
  );
  const chat2 = await Services.ChatService.createChat(
    course1,
    student2,
    sampleChats[1].title
  );

  // Add some messages in first chat
  await Services.MessageService.postNew(
    student1,
    chat1,
    sampleMessages[0].content
  );
  await Services.MessageService.postNew(
    student2,
    chat1,
    sampleMessages[1].content
  );
};

populate()
  .then(() => console.log('Populated database!'))
  .catch((err) => console.error('Could not populate database: ', err))
  .finally(() => db && db.disconnect());
