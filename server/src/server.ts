import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import https, { Server } from 'https';
import io from 'socket.io';
import SocketService from './services/socket';
import connectDatabase from './config/database';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routing from './config/routing';
import { PeerServer } from 'peer';
import path from 'path';
import fs from 'fs';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
process.env.NODE_ENV = 'development';

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;

const app: Express = express();

const privateKey = fs.readFileSync(path.resolve('server.key'), 'utf8');
const certificate = fs.readFileSync(path.resolve('server.cert'), 'utf8');

const credentials = { key: privateKey, cert: certificate };

const server: Server = https.createServer(credentials, app);

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ['https://localhost:8080', 'https://be.meet.pl:8080', 'https://127.0.0.1:8080'],
        credentials: true,
    }),
);

app.use(express.static(path.join(__dirname, '../public')));

const startServer = async (): Promise<void> => {
    try {
        await connectDatabase();
        const socket: io.Server = new io.Server(server, {
            cors: {
                origin: ['https://localhost:8080', 'https://be.meet.pl:8080', 'https://127.0.0.1:8080'],
                credentials: true,
            },
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

const peerServer = PeerServer({ port: 3001, path: '/' });

startServer();
