import React from 'react';

// hooks
import { useTranslation } from 'react-i18next';

// components
import SettingsComponent from 'components/settings';
import RoomContainer from 'components/room-container';
import CustomAvatar from 'components/avatar/Avatar';
import { Modal } from 'antd';

const UserComponent: React.FC = () => {
    const [isModalVisible, setModalVisible] = React.useState<boolean>(false);

    const { t } = useTranslation();

    const handleAvatarClick = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    return (
        <React.Fragment>
            <CustomAvatar
                imgSrc="https://store-images.s-microsoft.com/image/apps.23952.13510798887611042.610ae026-cc3d-4b4e-9044-1b8721988d93.876c0225-be52-4dab-849f-dee26d8f83ab?mode=scale&q=90&h=270&w=270&background=%23107C10"
                handleClick={handleAvatarClick}
            />
            <RoomContainer />
            {isModalVisible && (
                <Modal
                    title={t('common.settings')}
                    visible={isModalVisible}
                    onCancel={handleModalClose}
                    footer={null}
                >
                    <SettingsComponent handleModalClose={handleModalClose} />
                </Modal>
            )}
        </React.Fragment>
    );
};

export default UserComponent;
