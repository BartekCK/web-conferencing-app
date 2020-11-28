import React from 'react';

// components
import { Modal, Tabs } from 'antd';
import VideoInput from './containers/video-input/VideoInput';

// hooks
import { useTranslation } from 'react-i18next';
import {
    CustomerServiceOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

interface IProps {
    isVisible: boolean;
    onCancel: () => void;
    start: any;
    handleChangeSpeakersOutput: (deviceID: string) => void;
}
const { TabPane } = Tabs;

const InputOutputModal: React.FC<IProps> = (props: IProps) => {
    const {
        isVisible, onCancel, start, handleChangeSpeakersOutput,
    } = props;

    const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);
    const { t } = useTranslation();

    React.useEffect(() => {
        if (!isVisible) return;
        const getConnectedDevices = async () => {
            const resultDevices = await navigator.mediaDevices.enumerateDevices();
            setDevices(resultDevices);
        };
        getConnectedDevices();
    }, [isVisible]);

    const handleChangeVideoInput = (value: string) => {
        start(undefined, value);
    };

    const handleChangeMicroInput = (value: string) => {
        start(value);
    };

    return (
        <Modal
            title={t('common.settings')}
            visible={isVisible}
            onCancel={onCancel}
            footer={null}
        >
            <div>
                {devices.length > 0 && (
                    <Tabs defaultActiveKey="1" tabPosition="top">
                        <TabPane
                            tab={
                                <span>
                                    <CustomerServiceOutlined />
                                    {t('common.sound')}
                                </span>
                            }
                            key="1"
                        >
                            <VideoInput
                                devices={devices}
                                kind="audioinput"
                                placeholder="Mikrofon"
                                onChange={handleChangeMicroInput}
                            />
                            <VideoInput
                                devices={devices}
                                kind="audiooutput"
                                placeholder="Głośniki"
                                onChange={handleChangeSpeakersOutput}
                            />
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                    <VideoCameraOutlined />
                                    {t('common.display')}
                                </span>
                            }
                            key="2"
                        >
                            <VideoInput
                                devices={devices}
                                kind="videoinput"
                                placeholder="Video"
                                onChange={handleChangeVideoInput}
                            />
                        </TabPane>
                    </Tabs>
                )}
            </div>
        </Modal>
    );
};

export default InputOutputModal;
