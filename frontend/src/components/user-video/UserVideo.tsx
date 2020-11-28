import React from 'react';

import Audio from 'components/audio/Audio';
import { VideoStyled } from './styles';
import SettingsButton from 'components/settings-button';

interface IProps {
    openSettingModal: () => void;
    start: any;
}

declare global {
    interface Window {
        stream: any;
    }
}

const UserVideo = React.forwardRef((props: IProps, videoRef: any) => {
    const { openSettingModal, start } = props;

    React.useLayoutEffect(() => {
        start();
    }, []);

    return (
        <VideoStyled>
            <video className="user-video" ref={videoRef} autoPlay playsInline />
            <Audio />
            <SettingsButton handleClick={openSettingModal} />
        </VideoStyled>
    );
});

export default UserVideo;
