import React from 'react';

// hooks
import { useTranslation } from 'react-i18next';

// components
import { Tabs } from 'antd';
import ChangePassword from './components/change-password';
import ImageCropping from 'components/settings/components/image-cropping';
import { dispatchSetCurrentUser } from 'core/store/slices/auth.slice';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

interface IProps {
    onChangeTab?: () => void;
    handleModalClose: () => void;
}

const { TabPane } = Tabs;

const SettingsComponent: React.FC<IProps> = ({
    onChangeTab,
    handleModalClose,
}: IProps) => {
    const { t, i18n } = useTranslation();

    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
    const dispatch = useDispatch();

    const handleLogOut = () => {
        removeCookie('jwt');
        dispatch(dispatchSetCurrentUser(null));
        handleModalClose();
    };

    const handleLangChange = () => {
        if (i18n.language === 'pl') {
            i18n.changeLanguage('en');
            return;
        }
        i18n.changeLanguage('pl');
    };

    return (
        <Tabs defaultActiveKey="1" onChange={onChangeTab} centered size="small">
            <TabPane tab={t('common.setImage')} key="1">
                <ImageCropping handleModalClose={handleModalClose} />
            </TabPane>
            <TabPane tab={t('common.passwordChange')} key="2">
                <ChangePassword handleModalClose={handleModalClose} />
            </TabPane>
            <TabPane tab={t('common.common')} key="3">
                <div className="d-flex justify-content-between">
                    <button
                        onClick={handleLogOut}
                        type="button"
                        className="ant-btn ant-btn-ghost"
                    >
                        {t('common.logOut')}
                    </button>
                    <button
                        onClick={handleLangChange}
                        type="button"
                        className="ant-btn ant-btn-ghost"
                    >
                        {`${t('messages.changeLanguage')} ${i18n.language.toUpperCase()}`}
                    </button>
                </div>
            </TabPane>
        </Tabs>
    );
};

export default SettingsComponent;
