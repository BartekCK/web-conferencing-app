import React from 'react';

import Audio from 'components/audio/Audio';

interface IProps {}

const Video: React.FC<IProps> = (props: IProps) => {
    const streamRef = React.useRef<MediaStream | null>(null);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const constraints = {
        video: true,
        audio: true,
    };

    const getMedia = async () => {
        if (!videoRef.current) return;
        try {
            const audioStream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const videoStream: MediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            streamRef.current = new MediaStream([...videoStream.getVideoTracks(), ...audioStream.getVideoTracks()]);

            videoRef.current.srcObject = streamRef.current;
        } catch (err) {
            console.error('Error accessing media devices.', err);
        }
    };

    React.useLayoutEffect(() => {
        getMedia();
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track: MediaStreamTrack) => {
                    track.stop();
                });
            }
        };
    }, []);

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline />
            <Audio />
            <Audio />
            <Audio />
            <Audio />
            <Audio />
            <Audio />
            <Audio />
            <Audio />
            <Audio />
            <Audio />
            <Audio />
            <Audio />
        </div>
    );
};

export default Video;
