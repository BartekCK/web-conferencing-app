import { Express } from 'express';
import { authRouter } from '../routes/authRoutes';

const routing = (app: Express) => {
    app.use('/api/auth', authRouter);
};

export default routing;
