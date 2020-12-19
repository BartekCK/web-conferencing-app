import React, { useContext } from 'react';

import Audio from 'components/audio/Audio';
import { VideoStyled } from './styles';
import SettingsButton from 'components/settings-button';
import useAudio from 'custom--hooks/useAudio';
import ConversationContext from 'pages/conversation/provider';
import { IConversationContextShare } from 'pages/conversation/types';
import CircleBtn from 'components/circle-btn';
import { SoundOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { IStore } from 'core/store/types';
import { Avatar } from 'antd';

interface IProps {
    openSettingModal?: () => void;
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

const UserVideo = React.forwardRef((props: IProps, videoRef: any) => {
    const {
        openSettingModal, isAudio, isVideo, setAudio, setVideo,
    } = props;

    const { user } = useSelector((state: IStore) => state.auth);

    const { conversationConfig } = useContext<IConversationContextShare>(
        ConversationContext,
    );

    const [microPower] = useAudio(isAudio, conversationConfig.devices.microphoneDeviceID);

    return (
        <VideoStyled isVideo={isVideo}>
            <video
                className="user-video"
                ref={videoRef}
                autoPlay
                muted
            />
            <div className="user-video disable">
                <Avatar
                    src={user && user.image
                        ? `${process.env.API_HOST}${user.image}`
                        : undefined}
                    icon={!user || !user.image ? <UserOutlined /> : undefined}
                    size={90}
                    className="avatar"
                />
            </div>
            <Audio microPower={microPower} />
            <div className="tools--wrapper">
                <CircleBtn onClick={() => setVideo((prev) => !prev)} isTurnOn={isVideo} className="m-2">
                    <VideoCameraOutlined />
                </CircleBtn>
                <CircleBtn onClick={() => setAudio((prev) => !prev)} isTurnOn={isAudio} className="m-2">
                    <SoundOutlined />
                </CircleBtn>
            </div>
            {openSettingModal && <SettingsButton handleClick={openSettingModal} /> }
        </VideoStyled>
    );
});

export default UserVideo;
