const router = require('express').Router();
const { createNewCourse, viewAllCourses } = require('../controllers/course');

router.post('/new', createNewCourse);
router.get('/all', viewAllCourses);

module.exports = router;
