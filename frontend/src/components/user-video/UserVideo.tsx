import React, { useContext } from 'react';

import Audio from 'components/audio/Audio';
import { VideoStyled } from './styles';
import SettingsButton from 'components/settings-button';
import useAudio from 'custom--hooks/useAudio';
import ConversationContext from 'pages/conversation/provider';
import { IConversationContextShare } from 'pages/conversation/types';

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

    const { conversationConfig } = useContext<IConversationContextShare>(
        ConversationContext,
    );

    const [microPower] = useAudio(conversationConfig.devices.microphoneDeviceID);

    React.useLayoutEffect(() => {
        start();
    }, []);

    return (
        <VideoStyled>
            <video
                className="user-video"
                ref={videoRef}
                autoPlay
                playsInline
                muted
            />
            <Audio microPower={microPower} />
            <SettingsButton handleClick={openSettingModal} />
        </VideoStyled>
    );
});

export default UserVideo;
