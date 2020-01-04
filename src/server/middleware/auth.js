const { decodeToken } = require('../utils/token');
const { StudentService } = require('../services');

module.exports = async function auth(req, res, next) {
  const token = req.cookies['cz-token'];
  const payload = decodeToken(token);
  const student = await StudentService.get(payload._id);
  req.user = student;
  next();
};
