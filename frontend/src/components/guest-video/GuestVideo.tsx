import React, { useContext } from 'react';

import Audio from 'components/audio/Audio';
import { VideoStyled } from './styles';
import SettingsButton from 'components/settings-button';
import useAudio from 'custom--hooks/useAudio';
import ConversationContext from 'pages/conversation/provider';
import { IConversationContextShare } from 'pages/conversation/types';
import CircleBtn from 'components/circle-btn';
import { SoundOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { IGuestStream } from 'core/types';

interface IProps {
    peopleStream: IGuestStream;
}

const GuestVideo: React.FC<IProps> = ({ peopleStream }: IProps) => {
    const [isMuted, setMuted] = React.useState<boolean>(false);

    return (
        <div className="user--video">
            <video
                ref={(ref: HTMLVideoElement | null) => {
                    if (ref) {
                        ref.srcObject = peopleStream.stream;
                    }
                    return ref;
                }}
                autoPlay
                muted={isMuted}
            />
            <div className="tools--wrapper">
                <CircleBtn isTurnOn={isMuted} onClick={() => setMuted((prev) => !prev)} className="m-2">
                    <SoundOutlined />
                </CircleBtn>
            </div>
        </div>
    );
};

export default React.memo(GuestVideo);
