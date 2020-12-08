import Peer from 'peerjs';

const myPeer = new Peer(undefined, {
    host: '127.0.0.1',
    port: 3001,
    secure: false,
});

export default myPeer;
