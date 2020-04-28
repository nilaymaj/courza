import CourseRouter from './courses';
import ChatRouter from './chats';
import AuthRouter from './auth';
import StudentRouter from './students';
import MessageRouter from './messages';
import * as Mw from '../middleware';
import { Router } from 'express';
const router = Router();

// Uncomment this to delay all requests
// router.use((req, res, next) => setTimeout(() => next(), 2000));

router.use('/auth', AuthRouter);
router.use(Mw.auth);
router.use(Mw.objectify);
router.use('/courses', CourseRouter);
router.use('/chats', ChatRouter);
router.use('/students', StudentRouter);
router.use('/messages', MessageRouter);
router.use(Mw.errorHandler);

export default router;
