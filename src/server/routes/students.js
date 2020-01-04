const router = require('express').Router();
const { registerNewStudent } = require('../controllers/student');

// TODO: Update these routes once student service is complete
router.post('/new', registerNewStudent);

module.exports = router;
