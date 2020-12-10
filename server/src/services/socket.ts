import { Server, Socket } from 'socket.io';
import { SocketEvent } from '../types/enum';

const SocketService = (io: Server): void => {
    io.on(SocketEvent.Connect, (socket: Socket) => {
        console.log('Start new connection');

        socket.on('join-room', (roomId, userId) => {
            socket.join(roomId);
            socket.to(roomId).broadcast.emit('user-connected', userId);

            socket.on('send-message', (data) => {
                socket.to(roomId).emit('receive-message',data);
            });

            socket.on('send-is-typing', (email: string) => {
                socket.to(roomId).emit('receive-is-typing',email);
            });

            socket.on('disconnect', () => {
                console.log('User disconnect');
                socket.to(roomId).broadcast.emit('user-disconnected', userId);
            });
        });

        socket.on('disconnect', () => {
            console.log('End connection');
        });
    });
};

export default SocketService;
