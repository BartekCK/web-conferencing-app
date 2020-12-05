import { Router } from 'express';
import authController from '../controllers/authController';
import passport from 'passport';
import { passportStrategyJWT } from '../middlewares/auth';
export const authRouter: Router = Router();

authRouter.get('/signup', authController.signupGet);
authRouter.post('/signup', authController.signupPost);
authRouter.get(
    '/login',
    passportStrategyJWT.authenticate('jwt', { session: false }),
    authController.loginGet,
);
authRouter.get('/login2', authController.loginGet);
authRouter.post('/login', authController.loginPost);
