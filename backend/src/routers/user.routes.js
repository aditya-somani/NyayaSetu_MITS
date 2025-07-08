import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCallHistory,
  forgetPassword,
  resetPassword
} from '../controllers/user.controllers.js';

import { userMiddleware } from "../middlewares/user-auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/forgot-password', forgetPassword);
router.put('/reset-password/:token', resetPassword);

router.get('/call-history', userMiddleware, getCallHistory);

export default router;
