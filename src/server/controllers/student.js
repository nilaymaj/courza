import { StudentService } from '../services';
import controller from './controller';

export const registerNewStudent = controller(async (req, res) => {
  // TODO: COMPLETE THIS CONTROLLER
  const student = await StudentService.create(req.body);
  return res.send(student.toObject());
});
