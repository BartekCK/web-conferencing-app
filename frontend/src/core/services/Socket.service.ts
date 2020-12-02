import io from 'socket.io-client';

const ENDPOINT: string = 'http://127.0.0.1:3000/';

const socket = io(ENDPOINT);

const SocketService = {
    socket,
};

export default SocketService;
