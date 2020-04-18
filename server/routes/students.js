const {
  joinCourse,
  getProfile,
  getFullProfile,
} = require('../controllers/student');
const router = require('express').Router();

router.post('/join', joinCourse);
router.get('/profile', getProfile);
router.get('/fullprofile', getFullProfile);

module.exports = router;
