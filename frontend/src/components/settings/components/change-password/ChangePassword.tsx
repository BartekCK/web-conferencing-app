import React from 'react';
import {
    Button, Form, Input, notification,
} from 'antd';
import { FormInstance } from 'antd/es/form';
import { useTranslation } from 'react-i18next';
import { ActionType } from 'core/types/enums';

interface IProps {
    handleModalClose: () => void;
}

const ChangePassword: React.FC<IProps> = ({ handleModalClose }: IProps) => {
    const [isLoading, setLoading] = React.useState<boolean>(false);

    const [form] = Form.useForm();
    const { t } = useTranslation();

    const openNotification = (type: ActionType) => {
        if (type === ActionType.SUCCESS) {
            notification.info({
                message: t('common.passwordChange'),
                description: t('messages.changePassword'),
                placement: 'topLeft',
                duration: 2,
            });
            handleModalClose();
            return;
        }
        notification.error({
            message: t('common.passwordChange'),
            description: t('messages.validPassword'),
            placement: 'topLeft',
            duration: 2,
        });
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            openNotification(ActionType.SUCCESS);
        } catch (e) {
            openNotification(ActionType.ERROR);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            layout="vertical"
        >
            <Form.Item
                name="currentPassword"
                label={t('common.currentPassword')}
                rules={[
                    {
                        required: true,
                        message: t('messages.emptyPassword'),
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="newPassword"
                label={t('common.newPassword')}
                rules={[
                    {
                        required: true,
                        message: t('messages.emptyPassword'),
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="repeatNewPassword"
                label={t('common.passwordRepeat')}
                dependencies={['newPassword']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: t('messages.emptyRepeatPassword'),
                    },
                    ({ getFieldValue }: FormInstance) => ({
                        validator(rule, value) {
                            return new Promise((resolve, reject) => {
                                if (
                                    !value
                                    || getFieldValue('newPassword') === value
                                ) {
                                    return resolve();
                                }
                                return reject(
                                    new Error(t('messages.validRepeatPassword')),
                                );
                            });
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    {t('common.send')}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ChangePassword;
