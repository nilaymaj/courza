import { viewAllChatMessages, postNewMessage } from '../controllers/message';
import { Router } from 'express';
const router = Router();

router.post('/all', viewAllChatMessages);
router.post('/new', postNewMessage);

export default router;
