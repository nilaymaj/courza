import { Router } from 'express';
import { registerNewStudent } from '../controllers/student';
const router = Router();

// TODO: Update these routes once student service is complete
router.post('/new', registerNewStudent);

export default router;
