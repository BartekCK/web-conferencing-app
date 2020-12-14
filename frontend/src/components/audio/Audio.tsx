import React from 'react';

// styles
import { AudioStyled } from './styles';

const Audio: React.FC = () => {
    const [microPower, setMicroPower] = React.useState<number>(0);

    const javascriptNode = React.useRef<ScriptProcessorNode>();
    const audioContext = React.useRef<AudioContext>();
    const analyser = React.useRef<AnalyserNode>();
    const microphone = React.useRef<MediaStreamAudioSourceNode>();

    const audioStream = React.useRef<MediaStream | null>(null);

    const manageAudio = async () => {
        audioStream.current = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });

        audioContext.current = new AudioContext();
        analyser.current = audioContext.current.createAnalyser();
        microphone.current = audioContext.current.createMediaStreamSource(
            audioStream.current,
        );
        javascriptNode.current = audioContext.current.createScriptProcessor(
            2048,
            1,
            1,
        );

        analyser.current.smoothingTimeConstant = 0.8;
        analyser.current.fftSize = 1024;

        microphone.current.connect(analyser.current);
        analyser.current.connect(javascriptNode.current);
        javascriptNode.current.connect(audioContext.current.destination);

        javascriptNode.current.onaudioprocess = () => {
            if (!analyser.current) return;
            const array = new Uint8Array(analyser.current.frequencyBinCount);
            analyser.current.getByteFrequencyData(array);
            let values = 0;

            const { length } = array;
            for (let i = 0; i < length; i += 1) {
                values += array[i];
            }

            const average = values / length;
            setMicroPower(Math.round(average));
        };
    };

    React.useEffect(() => {
        manageAudio();
        return () => {
            if (
                javascriptNode.current
                && audioContext.current
                && analyser.current
                && microphone.current
                && audioStream.current
            ) {
                javascriptNode.current.disconnect();
                microphone.current.disconnect();
                analyser.current.disconnect();
                audioContext.current.close();

                const tracks: MediaStreamTrack[] = audioStream.current.getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, []);

    const calculateColor = (): string => {
        switch (true) {
        case microPower >= 24 && microPower < 48:
            return 'green';
        case microPower >= 48 && microPower < 72:
            return 'yellow';
        case microPower >= 72 && microPower < 96:
            return 'orange';
        case microPower >= 96:
            return 'red';
        default:
            return 'blue';
        }
    };

    const calculateTransform = () => {
        switch (true) {
        case microPower >= 24 && microPower < 48:
            return 'scale(0.8,0.4)';
        case microPower >= 48 && microPower < 72:
            return 'scale(0.8,0.6)';
        case microPower >= 72 && microPower < 96:
            return 'scale(0.6,0.8)';
        case microPower >= 96:
            return 'scale(0.6,1)';
        default:
            return 'scale(1,0.2)';
        }
    };

    return (
        <div className="audio--container d-flex">
            <AudioStyled
                style={{
                    backgroundColor: calculateColor(),
                    transform: calculateTransform(),
                }}
            />
            <AudioStyled
                style={{
                    backgroundColor: calculateColor(),
                    transform: calculateTransform(),
                }}
            />
            <AudioStyled
                style={{
                    backgroundColor: calculateColor(),
                    transform: calculateTransform(),
                }}
            />
        </div>
    );
};

export default React.memo(Audio);
