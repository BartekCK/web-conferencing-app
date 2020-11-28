import React from 'react';
import { ConversationPrepareStyled } from 'pages/conversation/containers/conversation-prepare/style';
import InputOutputModal from 'container/input-output-modal';
import UserVideo from 'components/user-video';

interface IProps {}

declare global {
    interface Window {
        stream: any;
    }
}

const ConversationPrepare: React.FC<IProps> = (props: IProps) => {
    const [isModalOpen, setModalOpen] = React.useState<boolean>(false);

    const streamRef = React.useRef<MediaStream | null>(null);
    const videoRef = React.useRef<any>(null);

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
                },
                video: {
                    deviceId: videDeviceID ? { exact: videDeviceID } : undefined,
                    // width: 600,
                    // height: 300,
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
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track: MediaStreamTrack) => {
                    track.stop();
                });
            }
        };
    }, []);

    const handleChangeOutput = (deviceID: string): void => {
        if (!videoRef.current) return;
        videoRef.current.setSinkId(deviceID);
    };

    return (
        <ConversationPrepareStyled>
            <UserVideo
                openSettingModal={() => setModalOpen(true)}
                start={start}
                ref={videoRef}
            />
            <InputOutputModal
                start={start}
                isVisible={isModalOpen}
                onCancel={() => setModalOpen(false)}
                handleChangeSpeakersOutput={handleChangeOutput}
            />
        </ConversationPrepareStyled>
    );
};

export default ConversationPrepare;
