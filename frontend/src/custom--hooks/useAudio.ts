import React from 'react';

const useAudio = (audioDeviceID): [number] => {
    const [microPower, setMicroPower] = React.useState<number>(0);

    const javascriptNode = React.useRef<ScriptProcessorNode>();
    const audioContext = React.useRef<AudioContext>();
    const analyser = React.useRef<AnalyserNode>();
    const microphone = React.useRef<MediaStreamAudioSourceNode>();

    const audioStream = React.useRef<MediaStream | null>(null);

    const manageAudio = async (deviceId) => {
        audioStream.current = await navigator.mediaDevices.getUserMedia({
            audio: {
                deviceId: deviceId ? { exact: deviceId } : undefined,
                echoCancellation: true,
                noiseSuppression: false,
                autoGainControl: false,
            },
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
        manageAudio(audioDeviceID);
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
    }, [audioDeviceID]);

    return [microPower];
};

export default useAudio;
