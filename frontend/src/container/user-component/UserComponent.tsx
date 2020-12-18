import React from 'react';

// hooks
import { useTranslation } from 'react-i18next';

// components
import SettingsComponent from 'components/settings';
import RoomContainer from 'components/room-container';
import CustomAvatar from 'components/avatar/Avatar';
import { Modal } from 'antd';
import { useCookies } from 'react-cookie';
import { dispatchSetCurrentUser } from 'core/store/slices/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from 'core/store/types';

const UserComponent: React.FC = () => {
    const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
    const { user } = useSelector((state: IStore) => state.auth);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleAvatarClick = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    return (
        <React.Fragment>
            <CustomAvatar
                imgSrc={
                    user && user.image
                        ? `${process.env.API_HOST}${user.image}`
                        : undefined
                }
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
