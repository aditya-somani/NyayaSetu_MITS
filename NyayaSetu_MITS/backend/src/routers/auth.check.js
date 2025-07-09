import { userMiddleware } from '../middlewares/user-auth.middleware.js';
import {Router} from 'express'
import checking from '../controllers/auth.controller.js';

const router=Router()
// Express route to verify token
router.get("/check", checking);

export default router