import { Router } from 'express';
import { viewAllCourseChats, createNewChat } from '../controllers/chat';
const router = Router();

router.post('/all', viewAllCourseChats);
router.post('/new', createNewChat);

export default router;
