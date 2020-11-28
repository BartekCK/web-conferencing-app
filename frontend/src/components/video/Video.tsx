import React from 'react';

import Audio from 'components/audio/Audio';
import { VideoStyled } from './styles';
import { Select } from 'antd';

interface IProps {}

declare global {
    interface Window {
        stream: any;
    }
}

const Video: React.FC<IProps> = (props: IProps) => {
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
                    width: 1280,
                    height: 720,
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

    const getConnectedDevices = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        setDevices(devices);
    };

    React.useLayoutEffect(() => {
        start();
        getConnectedDevices();
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track: MediaStreamTrack) => {
                    track.stop();
                });
            }
        };
    }, []);

    const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);

    const handleChangeMicroInput = (value: string) => {
        start(value);
    };

    const handleChangeOutput = (value) => {
        if (!videoRef.current) return;
        videoRef.current.setSinkId(value);
    };

    const handleChangeVideoInput = (value: string) => {
        start(undefined, value);
    };

    const { Option } = Select;

    return (
        <VideoStyled>
            <button type="button" onClick={getConnectedDevices}>
                Wybierz urządzenie
            </button>
            <video className="user-video" ref={videoRef} autoPlay playsInline />
            <Audio />
            <span>Mikrofon</span>
            <Select
                showSearch
                placeholder="Mikrofon"
                onChange={handleChangeMicroInput}
                defaultActiveFirstOption
            >
                {devices.map(
                    (device) =>
                        device.kind === 'audioinput' && (
                            <Option value={device.deviceId}>{device.label}</Option>
                        ),
                )}
            </Select>
            <span>Głośniki</span>
            <Select
                showSearch
                placeholder="Głośniki"
                onChange={handleChangeOutput}
                defaultActiveFirstOption
            >
                {devices.map(
                    (device) =>
                        device.kind === 'audiooutput' && (
                            <Option value={device.deviceId}>{device.label}</Option>
                        ),
                )}
            </Select>
            <span>Video</span>
            <Select
                showSearch
                placeholder="Video"
                onChange={handleChangeVideoInput}
                defaultActiveFirstOption
            >
                {devices.map(
                    (device) =>
                        device.kind === 'videoinput' && (
                            <Option value={device.deviceId}>{device.label}</Option>
                        ),
                )}
            </Select>
        </VideoStyled>
    );
};

export default Video;
