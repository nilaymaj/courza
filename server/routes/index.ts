import CourseRouter from './course';
import ThreadRouter from './thread';
import AuthRouter from './auth';
import StudentRouter from './student';
import MessageRouter from './message';
import EnrolmentRouter from './enrol';
import ResourceRouter from './resource';
import * as Mw from '../middleware';
import { Router } from 'express';
const router = Router();

// Uncomment this to delay all requests
// router.use((req, res, next) => setTimeout(() => next(), 2000));

router.use('/auth', AuthRouter);
router.use(Mw.auth);
router.use('/enrol', EnrolmentRouter);
router.use('/courses', CourseRouter);
router.use('/threads', ThreadRouter);
router.use('/students', StudentRouter);
router.use('/messages', MessageRouter);
router.use('/resources', ResourceRouter);
router.use(Mw.errorHandler);

export default router;
