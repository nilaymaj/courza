const { joinCourse } = require('../controllers/student');
const router = require('express').Router();

router.post('/join', joinCourse);

module.exports = router;
