import { Express } from 'express';
import authRouter from '../routes/authRoutes';
import userRouter from '../routes/userRoutes';
import roomRouter from '../routes/roomRoutes';
import uploadRouter from '../routes/uploadRoutes';

const routing = (app: Express) => {
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter)
    app.use('/api/rooms', roomRouter)
    app.use('/api/upload',  uploadRouter)
};

export default routing;
