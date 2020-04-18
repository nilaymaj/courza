const router = require('express').Router();
const { registerNewStudent, studentLogin, checkToken } = require('../controllers/auth');

// TODO: Update these routes once student service is complete
router.post('/register', registerNewStudent);
router.post('/login', studentLogin);
router.get('/ping', checkToken);

module.exports = router;
