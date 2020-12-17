import React, { useContext } from 'react';

import Audio from 'components/audio/Audio';
import { VideoStyled } from './styles';
import SettingsButton from 'components/settings-button';
import useAudio from 'custom--hooks/useAudio';
import ConversationContext from 'pages/conversation/provider';
import { IConversationContextShare } from 'pages/conversation/types';
import CircleBtn from 'components/circle-btn';
import { SoundOutlined, VideoCameraOutlined } from '@ant-design/icons';

interface IProps {
    openSettingModal?: () => void;
}

declare global {
    interface Window {
        stream: any;
    }
}

const UserVideo = React.forwardRef((props: IProps, videoRef: any) => {
    const { openSettingModal } = props;

    const { conversationConfig } = useContext<IConversationContextShare>(
        ConversationContext,
    );

    const [microPower] = useAudio(conversationConfig.devices.microphoneDeviceID);

    React.useLayoutEffect(() => {
        // start();
    }, []);

    const handleClick = () => {
        console.log('click');
    };

    return (
        <VideoStyled>
            <video
                // className="user-video"
                ref={videoRef}
                autoPlay
                // playsInline
                muted
            />
            <Audio microPower={microPower} />
            <div className="tools--wrapper">
                <CircleBtn onClick={handleClick} isTurnOn className="m-2">
                    <VideoCameraOutlined />
                </CircleBtn>
                <CircleBtn onClick={handleClick} className="m-2">
                    <SoundOutlined />
                </CircleBtn>
            </div>
            {openSettingModal && <SettingsButton handleClick={openSettingModal} /> }
        </VideoStyled>
    );
});

export default UserVideo;
