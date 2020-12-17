import React from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import { useParams } from 'react-router-dom';
import { ConversationStartStyled } from './style';
import ConversationMessage from 'pages/conversation/containers/conversation-messages';
import { LeftOutlined, SoundOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { IGuestStream, IUser, IUserList } from 'core/types';
import * as stream from 'stream';
import CircleBtn from 'components/circle-btn';
import GuestVideo from 'components/guest-video';

interface IProps {
    user: IUser;
}

const ConversationStart: React.FC<IProps> = (props: IProps) => {
    const { user } = props;

    const [isMessagesOpen, setMessagesOpen] = React.useState<boolean>(true);
    const [userList, setUserList] = React.useState<IUserList[]>([]);
    const [peopleStreams, setPeopleStreams] = React.useState<IGuestStream[]>([]);

    const myVideoRef = React.useRef<HTMLVideoElement>(null);
    const myStreamRef = React.useRef<MediaStream | undefined>(undefined);

    const mySocket = React.useRef<SocketIOClient.Socket | null>(null);
    const myPeer = React.useRef<Peer | null>(null);

    const [isVideoPlay, setVideoPlay] = React.useState<boolean>(true);
    const [isAudioPlay, setAudioPlay] = React.useState<boolean>(true);

    const { slug } = useParams();

    const newUserComeIn = (userId: string, myStreamTemp: MediaStream) => {
        if (!myPeer.current) return;
        const call: Peer.MediaConnection = myPeer.current.call(
            userId,
            myStreamTemp,
            {
                metadata: {
                    userEmail: user.email,
                    userId: user.id,
                },
            },
        ); // Call to call usera ktory przybyl
        /**
         * Nasluchiwanie przyjscia nowego uzytkownika przez juz obecnych
         */
        call.on('stream', (userVideoStream) => {
            setPeopleStreams((prev) => [
                ...prev,
                { stream: userVideoStream, userCall: call },
            ]);
        });
    };

    const startMyStream = async () => {
        if (!myVideoRef.current || !mySocket.current || !myPeer.current) return;
        myStreamRef.current = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true,
        });
        myVideoRef.current.srcObject = myStreamRef.current;

        /**
         * Akcja kiedy dochodzimy do pokoju gdzie sa uzytkownicy. Wysylamy im nasz stream
         * i odbieramy wszystkich innych obecnych
         */
        myPeer.current.on('call', (call) => {
            call.answer(myStreamRef.current); // jezeli ktos dojdzie wyslij mu swoj stream
            call.on('stream', (userVideoStream) => {
                // odbierz wszystkie streamy obecnych juz userow
                setPeopleStreams((prev) => [
                    ...prev,
                    { stream: userVideoStream, userCall: call },
                ]);
            });
        });

        mySocket.current.on('user-connected', (newUserPeerId: string, newUserEmail: string) => {
            if (!mySocket.current || !myStreamRef.current) {
                return;
            }
            mySocket.current.emit('user-list', user.email);
            newUserComeIn(newUserPeerId, myStreamRef.current);
        });
    };

    React.useLayoutEffect(() => {
        mySocket.current = io(process.env.API_HOST as string);
        myPeer.current = new Peer(undefined, {
            // host: '127.0.0.1',
            host: 'localhost',
            port: 3001,
            secure: false,
        });

        startMyStream();

        myPeer.current.on('open', (id: string) => {
            if (!mySocket.current) return;
            mySocket.current.emit('join-room', slug, id, user.email, user.id);
        });

        mySocket.current.on('user-list', (data) => {
            setUserList(data.currentUsers);
        });

        return () => {
            if (!myVideoRef.current || !mySocket.current || !myPeer.current || !myStreamRef.current) return;
            myPeer.current.destroy();
            mySocket.current.close();
            const tracks: MediaStreamTrack[] = myStreamRef.current.getTracks();
            tracks.forEach((track) => track.stop());
            myVideoRef.current.srcObject = null;
        };
    }, [mySocket, myVideoRef]);

    React.useEffect(() => {
        if (!mySocket.current) return;

        mySocket.current.on('user-disconnected', (userPeerId, email) => {
            setUserList((prevState) => prevState.filter((el) => el.email !== email));
            const peerForClose:
                | { stream: MediaStream; userCall: Peer.MediaConnection }
                | undefined = peopleStreams.find(
                    (el) => el.userCall.peer === userPeerId,
                );
            if (!peerForClose) return;
            setPeopleStreams((prev) =>
                prev.filter((el) => el.userCall.peer !== userPeerId));
            peerForClose.userCall.close();
        });
    }, [peopleStreams]);

    const renderGuestUser = React.useCallback(() => {
        return peopleStreams.map((guestStream) => (
            <GuestVideo key={guestStream.userCall.peer} peopleStream={guestStream} />));
    }, [peopleStreams]);

    const handleVideoClick = () => {
        if (!myStreamRef.current) return;
        const temp: boolean = !isVideoPlay;
        setVideoPlay(temp);
        const tracks: MediaStreamTrack[] = myStreamRef.current.getVideoTracks();
        tracks.forEach((track) => {
            track.enabled = temp;
        });
    };

    const handleAudioClick = () => {
        if (!myStreamRef.current) return;
        const temp: boolean = !isAudioPlay;
        setAudioPlay(temp);
        const tracks: MediaStreamTrack[] = myStreamRef.current.getAudioTracks();
        tracks.forEach((track) => {
            track.enabled = temp;
        });
    };

    return (
        <ConversationStartStyled isMessagesOpen={isMessagesOpen} className="conversation">
            <div className="video--wrapper">
                <div className="user--video">
                    <video ref={myVideoRef} muted autoPlay />
                    <div className="tools--wrapper">
                        <CircleBtn onClick={handleVideoClick} isTurnOn={isVideoPlay} className="m-2">
                            <VideoCameraOutlined />
                        </CircleBtn>
                        <CircleBtn onClick={handleAudioClick} isTurnOn={isAudioPlay} className="m-2">
                            <SoundOutlined />
                        </CircleBtn>
                    </div>
                </div>
                {renderGuestUser()}
                <div className="open--bnt">
                    <Button
                        type="primary"
                        onClick={() => setMessagesOpen((prev) => !prev)}
                    >
                        <LeftOutlined />
                    </Button>
                </div>
            </div>
            <ConversationMessage
                userList={userList}
                isMessagesOpen={isMessagesOpen}
                ref={mySocket}
                user={user}
            />
        </ConversationStartStyled>
    );
};

export default ConversationStart;
