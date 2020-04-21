const router = require('express').Router();
const {
  viewAllChatMessages,
  postNewMessage,
} = require('../controllers/message');

router.post('/all', viewAllChatMessages);
router.post('/new', postNewMessage);

module.exports = router;
