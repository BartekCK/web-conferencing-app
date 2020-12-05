import { Express } from 'express';
import authRouter from '../routes/authRoutes';
import userRouter from '../routes/userRoutes';

const routing = (app: Express) => {
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter)
};

export default routing;
