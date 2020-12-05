import { Router } from 'express';
import authController from '../controllers/authController';
import { passportStrategyJWT } from '../middlewares/authMiddleware';

export const authRouter: Router = Router();

authRouter.post('/signup', authController.signupPost);
authRouter.post('/login', authController.loginPost);
authRouter.post('/login/facebook', authController.loginFacebookPost);
authRouter.get(
    '/login/token',
    passportStrategyJWT.authenticate('jwt', { session: false }),
    authController.loginByTokenPost,
);

// test
authRouter.get('/get/test-without-auth', authController.testAuthGet);
authRouter.get(
    '/get/test-with-auth',
    passportStrategyJWT.authenticate('jwt', { session: false }),
    authController.testAuthGet,
);
