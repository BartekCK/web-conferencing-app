import React from 'react';

// styles
import { InputRoomStyled, SingleRoomStyled } from './styles';

// icons
import { CopyOutlined } from '@ant-design/icons';

// components
import {
    AutoComplete, Button, Input, Modal, notification, Spin, Tabs,
} from 'antd';

// hooks
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

// types
import { ISingleRoom } from 'core/types';
import {
    userRoomByIdDelete,
    userRoomByIdGet,
    userRoomPut,
    usersEmailsGet,
} from 'core/api/commands';
import ImageCropping from 'components/settings/components/image-cropping';
import ChangePassword from 'components/settings/components/change-password';
import GuestTable from 'components/room-container/components/settings-room/GuestTable';

interface IProps {
    singleRoom: ISingleRoom;
    closeModal: () => void;
    deleteRoom: (id: string) => void;
    updateRoom: (newRoom: ISingleRoom) => void;
}

const { TabPane } = Tabs;

const SettingRoom: React.FC<IProps> = ({
    closeModal,
    deleteRoom,
    updateRoom,
    singleRoom,
}: IProps) => {
    const { roomName, id: roomId } = singleRoom;
    const [room, setRoom] = React.useState<ISingleRoom | null>(null);
    const [newValue, setNewValue] = React.useState<string>(roomName || '');
    const [currentNameRoom, setCurrentNameRoom] = React.useState<string>('');
    const [isLoading, setLoading] = React.useState<boolean>(false);

    const { t } = useTranslation();

    const getRoomData = async () => {
        try {
            setLoading(true);
            const data = await userRoomByIdGet(roomId);
            setRoom(data);
        } catch (e) {
            notification.error({
                message: t('common.error'),
                description: t('messages.commonError'),
                placement: 'topLeft',
                duration: 2,
            });
            closeModal();
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        getRoomData();
    }, []);

    const changeRoomName = async () => {
        try {
            setLoading(true);
            const res: ISingleRoom = await userRoomPut(roomId, {
                roomName: newValue,
            });
            updateRoom(res);
        } catch (e) {
            notification.error({
                message: t('common.error'),
                description: t('messages.commonError'),
                placement: 'topLeft',
                duration: 2,
            });
        } finally {
            setLoading(false);
            closeModal();
        }
    };
    const handleDeleteRoom = async () => {
        try {
            setLoading(true);
            await userRoomByIdDelete(roomId);
            deleteRoom(roomId);
        } catch (e) {
            notification.error({
                message: t('common.error'),
                description: t('messages.commonError'),
                placement: 'topLeft',
                duration: 2,
            });
        } finally {
            setLoading(false);
            closeModal();
        }
    };

    const handleChange = (event) => {
        setNewValue(event.target.value);
    };

    if (!room) {
        return (
            <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: '200px' }}
            >
                <Spin size="large" />
            </div>
        );
    }
    return (
        <Spin spinning={isLoading}>
            <Tabs defaultActiveKey="1" centered size="small">
                <TabPane tab={t('common.groupCreate')} key="1">
                    <GuestTable singleRoom={room} setRoom={setRoom} />
                </TabPane>
                <TabPane tab={t('common.settings')} key="3">
                    <div className="row mb-2">
                        <Input
                            placeholder={t('common.setRoomName')}
                            className="col-6 mx-2"
                            value={newValue}
                            defaultValue={roomName}
                            onChange={handleChange}
                        />
                        <Button
                            disabled={newValue.length === 0 || roomName === newValue}
                            className="col mx-2"
                            type="primary"
                            onClick={changeRoomName}
                        >
                            {t('common.save')}
                        </Button>
                    </div>
                    <div className="row mt-4">
                        <Input
                            placeholder={t('messages.deleteConversation')}
                            className="col-6 mx-2"
                            value={currentNameRoom}
                            onChange={(event) =>
                                setCurrentNameRoom(event.target.value)}
                        />
                        <Button
                            disabled={room.roomCode !== currentNameRoom}
                            className="col mx-2"
                            danger
                            onClick={handleDeleteRoom}
                        >
                            {t('common.deleteConversation')}
                        </Button>
                    </div>
                </TabPane>
            </Tabs>
        </Spin>
    );
};

export default SettingRoom;
