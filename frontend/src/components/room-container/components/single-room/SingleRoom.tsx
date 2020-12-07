import React from 'react';

// styles
import { InputRoomStyled, SingleRoomStyled } from './styles';

// icons
import { CopyOutlined } from '@ant-design/icons';

// components
import { Modal, notification } from 'antd';

// hooks
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

// types
import { ISingleRoom } from 'core/types';
import { userRoomByIdDelete } from 'core/api/commands';
import SettingRoom from 'components/room-container/components/settings-room';

interface IProps {
    singleRoom: ISingleRoom;
    deleteRoom: (id: string) => void;
    updateRoom: (newRoom: ISingleRoom) => void;
}

const SingleRoom: React.FC<IProps> = ({
    singleRoom,
    deleteRoom,
    updateRoom,
}: IProps) => {
    const { roomCode, roomName } = singleRoom;

    const spanRef = React.useRef<HTMLInputElement>(null);
    const [isModalVisible, setModalVisible] = React.useState<boolean>(false);

    const { t } = useTranslation();
    const history = useHistory();

    const handleOpenModal = async () => {
        setModalVisible(true);
    };

    const handleStartMeet = () => {
        history.push(`/conversation/${roomCode}`);
    };

    const handleCopy = async () => {
        if (!spanRef || !spanRef.current) return;
        await navigator.clipboard.writeText(roomCode);
        notification.info({
            message: t('messages.copyClipboard'),
            description: spanRef.current.value,
            placement: 'topLeft',
            duration: 2,
        });
    };

    return (
        <React.Fragment>
            <SingleRoomStyled>
                <div className="title--wrapper">
                    <span className="title">
                        {roomName || t('common.setRoomName')}
                    </span>
                </div>
                <InputRoomStyled>
                    <span
                        className="ant-btn title"
                        ref={spanRef}
                        onClick={handleOpenModal}
                    >
                        {roomCode}
                    </span>
                    <button
                        type="button"
                        className="btn-copy ant-btn ant-btn-ghost"
                        onClick={handleCopy}
                    >
                        <CopyOutlined />
                    </button>
                    <button
                        type="button"
                        className="btn-visit ant-btn ant-btn-primary"
                        onClick={handleStartMeet}
                    >
                        {t('common.visit')}
                    </button>
                </InputRoomStyled>
            </SingleRoomStyled>
            {isModalVisible && (
                <Modal
                    title={t('common.settings')}
                    visible={isModalVisible}
                    onCancel={() => setModalVisible(false)}
                    footer={null}
                >
                    <SettingRoom
                        updateRoom={updateRoom}
                        deleteRoom={deleteRoom}
                        closeModal={() => setModalVisible(false)}
                        singleRoom={singleRoom}
                    />
                </Modal>
            )}
        </React.Fragment>
    );
};

export default SingleRoom;
