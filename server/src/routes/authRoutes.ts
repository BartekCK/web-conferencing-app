import { Router } from 'express';
import authController from '../controllers/authController';
import passportStrategyJWT from '../middlewares/authMiddleware';

const authRouter: Router = Router();

authRouter.post('/signup', authController.signupPost);
authRouter.post('/login', authController.loginPost);
authRouter.post('/login/facebook', authController.loginFacebookPost);
authRouter.get('/login/token', passportStrategyJWT, authController.loginByTokenPost);

export default authRouter;
