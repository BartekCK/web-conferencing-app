import { Express } from 'express';
import authRouter from '../routes/authRoutes';
import userRouter from '../routes/userRoutes';
import roomRouter from '../routes/roomRoutes';

const routing = (app: Express) => {
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter)
    app.use('/api/rooms', roomRouter)
};

export default routing;
