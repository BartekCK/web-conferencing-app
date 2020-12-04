import { Router } from 'express';
import authController from '../controllers/authController';

export const authRouter: Router = Router();

authRouter.get('/signup', authController.signupGet);
authRouter.post('/signup', authController.signupPost);
authRouter.get('/login', authController.loginGet);
authRouter.post('/login', authController.loginPost);
