import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import http, { Server } from 'http';
import io from 'socket.io';
import SocketService from './services/socket';
import connectDatabase from './config/database';

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;

const app: Express = express();
const server: Server = http.createServer(app);

const startServer = async (): Promise<void> => {
    try {
        await connectDatabase();
        const socket: io.Server = new io.Server(server, {
            cors: { origin: '*' },
        });
        SocketService(socket);

        server.listen(PORT, () => {
            console.log(`Server started on ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

startServer();
