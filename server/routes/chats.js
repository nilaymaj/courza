import { viewAllCourseChats, createNewChat } from '../controllers/chat';
import { Router } from 'express';
const router = Router();

router.post('/all', viewAllCourseChats);
router.post('/new', createNewChat);

export default router;
