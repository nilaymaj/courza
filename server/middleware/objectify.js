const Services = require('../services');
const { ValidationError } = require('../utils/errors');
const controller = require('../controllers/controller');

// This middleware looks at studentId, courseId and chatId of the request body.
// If any are found, the middleware attaches corresponding document object to the request.

module.exports = controller(async (req, res, next) => {
  const { studentId, courseId, pollId, chatId, messageId } = req.body;
  try {
    if (studentId) req.student = await Services.StudentService.get(studentId);
    if (courseId) req.course = await Services.CourseService.get(courseId);
    if (chatId) req.chat = await Services.ChatService.get(chatId);
    if (messageId) req.message = await Services.MessageService.get(messageId);
    if (pollId) req.poll = await Services.PollService.get(pollId);
    next();
  } catch (err) {
    return res.status(400).send(new ValidationError('Invalid ID provided.'));
  }
});
