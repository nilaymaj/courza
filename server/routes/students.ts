import { joinCourse, getProfile, getFullProfile } from '../controllers/student';
import { Router } from 'express';
const router = Router();

router.post('/join', joinCourse);
router.get('/profile', getProfile);
router.get('/fullprofile', getFullProfile);

export default router;
