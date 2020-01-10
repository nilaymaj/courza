const { joinCourse, getProfile } = require('../controllers/student');
const router = require('express').Router();

router.post('/join', joinCourse);
router.get('/profile', getProfile);

module.exports = router;
