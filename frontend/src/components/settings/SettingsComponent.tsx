import React from 'react';
import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import ChangePassword from './components/change-password';

interface IProps {
    onChangeTab?: () => void;
}

const { TabPane } = Tabs;

const SettingsComponent: React.FC<IProps> = ({ onChangeTab }: IProps) => {
    const { t } = useTranslation();

    return (
        <Tabs defaultActiveKey="1" onChange={onChangeTab} centered size="small">
            <TabPane tab={t('common.setImage')} key="1">
                Content of Tab Pane 1
            </TabPane>
            <TabPane tab={t('common.passwordChange')} key="2">
                <ChangePassword />
            </TabPane>
        </Tabs>
    );
};

export default SettingsComponent;
