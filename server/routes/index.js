const CourseRouter = require('./courses');
const ChatRouter = require('./chats');
const AuthRouter = require('./auth');
const StudentRouter = require('./students');
const MessageRouter = require('./messages');
const Mw = require('../middleware');
const router = require('express').Router();

// Uncomment this to delay all requests
// router.use((req, res, next) => setTimeout(() => next(), 2000));

router.use('/auth', AuthRouter);
router.use(Mw.auth);
router.use(Mw.objectify);
router.use('/courses', CourseRouter);
router.use('/chats', ChatRouter);
router.use('/students', StudentRouter);
router.use('/messages', MessageRouter);
router.use(Mw.errorHandler);

module.exports = router;
