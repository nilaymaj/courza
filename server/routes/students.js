const {
  joinCourse,
  getProfile,
  getFullProfile,
} = require('../controllers/student');
const router = require('express').Router();

router.post('/join', joinCourse);
router.get('/profile', getProfile);
router.get('/coursechats', getFullProfile);

module.exports = router;
