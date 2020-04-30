import { createNewCourse, viewAllCourses } from '../controllers/course';
import { Router } from 'express';
const router = Router();

router.post('/new', createNewCourse);
router.get('/all', viewAllCourses);

export default router;
