import React from 'react';
import { Button, Form, Input } from 'antd';
import { FormInstance } from 'antd/es/form';
import { useTranslation } from 'react-i18next';

const ChangePassword = () => {
    const [form] = Form.useForm();
    const { t } = useTranslation();

    const onFinish = (values) => {
        console.log(values);
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
                hasFeedback
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
                <Button type="primary" htmlType="submit">
                    {t('common.send')}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ChangePassword;
