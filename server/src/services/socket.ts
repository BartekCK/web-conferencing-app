import { Server, Socket } from 'socket.io';
import { SocketEvent } from '../types/enum';

const SocketService = (io: Server): void => {
    io.on(SocketEvent.Connect, (socket: Socket) => {
        console.log('User connected');

        socket.on(SocketEvent.RoomJoin, (data) => {
            console.log(data);
        });
    });
};

export default SocketService;
