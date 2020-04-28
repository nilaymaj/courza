import { decodeToken } from '../utils/token';
import { StudentService } from '../services';
import controller from '../controllers/controller';

export default controller(async (req, res, next) => {
  const token = req.cookies['cz-token'];
  const payload = decodeToken(token);
  const student = await StudentService.get(payload._id);
  req.user = student;
  next();
});
