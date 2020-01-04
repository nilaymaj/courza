const router = require('express').Router();
const { viewAllCourseChats, createNewChat } = require('../controllers/chat');

router.post('/all', viewAllCourseChats);
router.post('/new', createNewChat);

module.exports = router;
