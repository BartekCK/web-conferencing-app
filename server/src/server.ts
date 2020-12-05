import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import http, { Server } from 'http';
import io from 'socket.io';
import SocketService from './services/socket';
import connectDatabase from './config/database';
import { authRouter } from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routing from './config/routing';

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;

const app: Express = express();
const server: Server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ['https://localhost:8080', 'https://be.meet.pl:8080', 'https://127.0.0.1:8080'],
        // origin: ['https://127.0.0.1:8080'],
        credentials: true,
    }),
);

const startServer = async (): Promise<void> => {
    try {
        await connectDatabase();
        const socket: io.Server = new io.Server(server, {
            cors: { origin: '*' },
        });

        routing(app);
        SocketService(socket);

        server.listen(PORT, () => {
            console.log(`Server started on ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

startServer();
