const CourseRouter = require('./courses');
const ChatRouter = require('./chats');
const AuthRouter = require('./auth');
const StudentRouter = require('./students');
const Mw = require('../middleware');
const router = require('express').Router();

router.use('/auth', AuthRouter);
router.use(Mw.auth);
router.use(Mw.objectify);
router.use('/courses', CourseRouter);
router.use('/chats', ChatRouter);
router.use('/students', StudentRouter);
router.use(Mw.errorHandler);

module.exports = router;
