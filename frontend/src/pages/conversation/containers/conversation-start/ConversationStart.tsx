import React from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import { useParams } from 'react-router-dom';

interface IProps {}

const ENDPOINT: string = 'http://127.0.0.1:3000/';

const ConversationStart: React.FC<IProps> = (props: IProps) => {
    const [peers, setPeers] = React.useState<{ userId: any; peer: any }[]>([]);

    const myVideoRef = React.useRef<HTMLVideoElement>(null);
    const divWrapperRef = React.useRef<HTMLDivElement>(null);
    const myStream = React.useRef<MediaStream | undefined>(undefined);

    const mySocket = React.useRef<SocketIOClient.Socket | null>(null);
    const myPeer = React.useRef<Peer | null>(null);

    const { slug } = useParams();

    const addVideoStream = (video: HTMLVideoElement, stream) => {
        if (!divWrapperRef.current) return;
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
            video.play();
        });
        divWrapperRef.current.append(video);
    };

    function connectToNewUser(userId: string, stream: MediaStream) {
        if (!myPeer.current) return;
        const call: Peer.MediaConnection = myPeer.current.call(userId, stream);
        const video = document.createElement('video');

        call.on('stream', (userVideoStream) => {
            addVideoStream(video, userVideoStream);
        });
        call.on('close', () => {
            video.remove();
        });
        peers.push({ userId, peer: call });
        setPeers(peers);
    }

    const startMyStream = async () => {
        if (!myVideoRef.current || !divWrapperRef.current || !mySocket.current || !myPeer.current) return;
        myStream.current = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true,
        });
        addVideoStream(myVideoRef.current, myStream.current);

        myPeer.current.on('call', (call) => {
            call.answer(myStream.current);
            const video = document.createElement('video');
            call.on('stream', (userVideoStream) => {
                addVideoStream(video, userVideoStream);
            });
        });

        mySocket.current.on('user-connected', (userID) => {
            connectToNewUser(userID, myStream.current as MediaStream);
        });
    };

    React.useLayoutEffect(() => {
        mySocket.current = io(ENDPOINT);
        myPeer.current = new Peer(undefined, {
            host: '127.0.0.1',
            port: 3001,
            secure: false,
        });

        startMyStream();

        myPeer.current.on('open', (id: string) => {
            if (!mySocket.current) return;
            mySocket.current.emit('join-room', slug, id);
        });

        mySocket.current.on('user-disconnected', (userId) => {
            console.log(`User ${userId} has left`);
            if (peers.some((el) => el.userId === userId)) {
                const peer = peers.find((el) => el.userId === userId);
                if (!peer) return;
                peer.peer.close();
                setPeers(peers.filter((el) => el.userId !== userId));
            }
        });

        return () => {
            if (!myStream.current || !myVideoRef.current || !mySocket.current || !myPeer.current) return;
            myPeer.current.destroy();
            mySocket.current.close();
            const tracks: MediaStreamTrack[] = myStream.current.getTracks();
            tracks.forEach((track) => track.stop());
            myVideoRef.current.srcObject = null;
        };
    }, [myStream, divWrapperRef, mySocket, myVideoRef]);

    return (
        <div ref={divWrapperRef}>
            <video ref={myVideoRef} muted />
        </div>
    );
};

export default ConversationStart;
