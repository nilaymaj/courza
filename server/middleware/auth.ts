import { decodeToken } from '../utils/token';
import { StudentService } from '../services';
import controller from '../routes/controller';
import { Request } from 'express';
import { IStudent } from '../models/student';

interface IAuthReq extends Request {
  user?: IStudent;
}
export default controller(async (req: IAuthReq, _res, next) => {
  const token = req.cookies['cz-token'];
  const payload = decodeToken(token);
  const student = await StudentService.get(payload._id.toString());
  req.user = student;
  next();
});
