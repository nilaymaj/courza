import {
  registerNewStudent,
  studentLogin,
  checkToken,
} from '../controllers/auth';
import { Router } from 'express';
const router = Router();

// TODO: Update these routes once student service is complete
router.post('/register', registerNewStudent);
router.post('/login', studentLogin);
router.get('/ping', checkToken);

export default router;
