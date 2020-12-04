import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import http, { Server } from 'http';
import io from 'socket.io';
import SocketService from './services/socket';
import connectDatabase from './config/database';
import { authRouter } from './routes/authRoutes';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;

const app: Express = express();
const server: Server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());

const startServer = async (): Promise<void> => {
    try {
        await connectDatabase();
        const socket: io.Server = new io.Server(server, {
            cors: { origin: '*' },
        });

        app.use(authRouter);

        SocketService(socket);

        server.listen(PORT, () => {
            console.log(`Server started on ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

startServer();
