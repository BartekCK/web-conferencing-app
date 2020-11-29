import React from 'react';

// components
import { Modal, Tabs } from 'antd';
import VideoInput from './containers/video-input/VideoInput';

// hooks
import { useTranslation } from 'react-i18next';
import { CustomerServiceOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { IConversationContextShare } from 'pages/conversation/types';
import ConversationContext from 'pages/conversation/provider';
import { updateDevice } from 'pages/conversation/actions';

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

    const { conversationConfig, dispatch } = React.useContext<
        IConversationContextShare
    >(ConversationContext);

    const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);
    const { t } = useTranslation();

    const getConnectedDevices = async (): Promise<MediaDeviceInfo[]> => {
        const resultDevices: MediaDeviceInfo[] = await navigator.mediaDevices.enumerateDevices();
        setDevices(resultDevices);
        return resultDevices;
    };

    React.useEffect(() => {
        const setVideoCamera = async () => {
            const deviceList: MediaDeviceInfo[] = await getConnectedDevices();
            const tempVideo: MediaDeviceInfo[] = deviceList.filter(
                (device: MediaDeviceInfo) => device.kind === 'videoinput',
            );
            if (tempVideo.length > 0) {
                dispatch(updateDevice({ videoDeviceID: tempVideo[0].deviceId }));
            }
        };
        setVideoCamera();
    }, []);

    React.useEffect(() => {
        if (!isVisible) return;
        getConnectedDevices();
    }, [isVisible]);

    const handleChangeVideoInput = (value: string) => {
        dispatch(updateDevice({ videoDeviceID: value }));
        start(undefined, value);
    };

    const handleChangeMicroInput = (value: string) => {
        dispatch(updateDevice({ microphoneDeviceID: value }));
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
                                placeholder={t('common.microphone')}
                                onChange={handleChangeMicroInput}
                                value={conversationConfig.devices.microphoneDeviceID}
                            />
                            <VideoInput
                                devices={devices}
                                kind="audiooutput"
                                placeholder={t('common.speakers')}
                                onChange={handleChangeSpeakersOutput}
                                value={conversationConfig.devices.speakersDeviceID}
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
                                placeholder={t('common.camera')}
                                onChange={handleChangeVideoInput}
                                value={conversationConfig.devices.videoDeviceID}
                            />
                        </TabPane>
                    </Tabs>
                )}
            </div>
        </Modal>
    );
};

export default InputOutputModal;
