const { CourseService, ChatService } = require('../services');
const controller = require('./controller');

exports.createNewChat = controller(async (req, res) => {
  const creatorId = req.student._id;
  const courseId = req.course._id;
  const chatInfo = req.body;

  const chat = await CourseService.createNewChat(req.course, { ...chatInfo, courseId, creatorId });
  return res.send(chat.toObject());
});

exports.viewAllCourseChats = controller(async (req, res) => {
  const courseId = req.course._id;
  const chats = await ChatService.getAll(courseId);
  const plainChats = chats.map(c => c.toObject());
  return res.send(plainChats);
});
