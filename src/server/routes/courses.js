import { Router } from 'express';
import { createNewCourse, viewAllCourses } from '../controllers/course';
const router = Router();

router.post('/new', createNewCourse);
router.get('/all', viewAllCourses);

export default router;
