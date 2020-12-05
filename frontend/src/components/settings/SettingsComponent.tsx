import React from 'react';

// hooks
import { useTranslation } from 'react-i18next';

// components
import { Tabs } from 'antd';
import ChangePassword from './components/change-password';
import ImageCropping from 'components/settings/components/image-cropping';

interface IProps {
    onChangeTab?: () => void;
    handleModalClose: () => void;
}

const { TabPane } = Tabs;

const SettingsComponent: React.FC<IProps> = ({
    onChangeTab,
    handleModalClose,
}: IProps) => {
    const { t } = useTranslation();

    return (
        <Tabs defaultActiveKey="1" onChange={onChangeTab} centered size="small">
            <TabPane tab={t('common.setImage')} key="1">
                <ImageCropping handleModalClose={handleModalClose} />
            </TabPane>
            <TabPane tab={t('common.passwordChange')} key="2">
                <ChangePassword handleModalClose={handleModalClose} />
            </TabPane>
        </Tabs>
    );
};

export default SettingsComponent;
