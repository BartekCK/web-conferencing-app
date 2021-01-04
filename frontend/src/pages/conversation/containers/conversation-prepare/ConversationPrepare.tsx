import React from 'react';
import { ConversationPrepareStyled } from 'pages/conversation/containers/conversation-prepare/style';
import InputOutputModal from 'pages/conversation/containers/input-output-modal';
import UserVideo from 'components/user-video';
import ConversationContext from 'pages/conversation/provider';
import { IConversationContextShare } from 'pages/conversation/types';
import { updateDevice } from 'pages/conversation/actions';
import ConversationStartButton from 'pages/conversation/components/conversation-start-button/ConversationStartButton';

interface IProps {
    isVideo: boolean;
    isAudio: boolean;
    setVideo: any;
    setAudio: any;
}

declare global {
    interface Window {
        stream: any;
    }
}

const ConversationPrepare: React.FC<IProps> = (props: IProps) => {
    const {
        isAudio, isVideo, setAudio, setVideo,
    } = props;
    const [isModalOpen, setModalOpen] = React.useState<boolean>(false);

    const streamRef = React.useRef<MediaStream | null>(null);
    const videoRef = React.useRef<any>(null);

    const {
        conversationConfig,
        dispatch,
    } = React.useContext<IConversationContextShare>(ConversationContext);

    const start = async (audioDeviceID?: string, videDeviceID?: string) => {
        if (!videoRef.current) return;
        if (window.stream) {
            window.stream.getTracks().forEach((track) => {
                track.stop();
            });
        }
        try {
            const constraints = {
                audio: {
                    deviceId: audioDeviceID ? { exact: audioDeviceID } : undefined,
                    echoCancellation: true,
                    noiseSuppression: false,
                    autoGainControl: false,
                },
                video: {
                    deviceId: videDeviceID ? { exact: videDeviceID } : undefined,
                },
            };

            streamRef.current = await navigator.mediaDevices.getUserMedia(
                constraints,
            );

            videoRef.current.srcObject = streamRef.current;
        } catch (err) {
            console.error('Error accessing media devices.', err);
        }
    };

    React.useLayoutEffect(() => {
        start();
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track: MediaStreamTrack) => {
                    track.stop();
                });
            }
        };
    }, []);

    React.useEffect(() => {
        if (!videoRef.current) return;
        const { speakersDeviceID } = conversationConfig.devices;
        videoRef.current.setSinkId(speakersDeviceID);
    }, [conversationConfig.devices.speakersDeviceID]);

    const handleChangeSpeakersOutput = (deviceID: string): void => {
        dispatch(updateDevice({ speakersDeviceID: deviceID }));
    };

    return (
        <React.Fragment>
            <ConversationPrepareStyled>
                <UserVideo
                    isVideo={isVideo}
                    isAudio={isAudio}
                    setAudio={setAudio}
                    setVideo={setVideo}
                    openSettingModal={() => setModalOpen(true)}
                    ref={videoRef}
                />
                <ConversationStartButton />
            </ConversationPrepareStyled>
            <InputOutputModal
                start={start}
                isVisible={isModalOpen}
                onCancel={() => setModalOpen(false)}
                handleChangeSpeakersOutput={handleChangeSpeakersOutput}
            />
        </React.Fragment>
    );
};

export default ConversationPrepare;
