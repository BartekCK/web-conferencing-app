import React from 'react';

// hooks
import { useTranslation } from 'react-i18next';

// components
import { Form, Input, Button } from 'antd';
import ReCAPTCHA from 'react-google-recaptcha';
import { ArrowLeftOutlined } from '@ant-design/icons';

// styles
import { RegisterComponentStyled } from 'components/register-component/styles';

// store
import { dispatchSetCurrentLayout } from 'core/store/slices/config.slice';
import { useDispatch } from 'react-redux';

// types
import { LayoutType } from 'core/store/types/enum';
import { FormInstance } from 'antd/es/form';

const RegisterComponent: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const handleReturnToLogin = React.useCallback(() => {
        dispatch(dispatchSetCurrentLayout(LayoutType.LOGIN_LAYOUT));
    }, [dispatch]);

    return (
        <RegisterComponentStyled>
            <button
                type="button"
                className="btn-return ant-btn ant-btn-sm ant-btn-link align-self-start my-3"
                onClick={handleReturnToLogin}
            >
                <ArrowLeftOutlined />
                <span>{t('common.signInReturn')}</span>
            </button>
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
                layout="vertical"
            >
                <Form.Item
                    name="email"
                    label={t('common.email')}
                    rules={[
                        {
                            type: 'email',
                            message: t('messages.validEmail'),
                        },
                        {
                            required: true,
                            message: t('messages.emptyEmail'),
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label={t('common.password')}
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
                    name="confirm"
                    label={t('common.passwordRepeat')}
                    dependencies={['password']}
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
                                        || getFieldValue('password') === value
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

                <Form.Item
                    name="phone"
                    label={t('common.phoneNumber')}
                    rules={[
                        {
                            required: true,
                            message: t('messages.emptyPhone'),
                        },
                    ]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="captcha"
                    rules={[
                        {
                            required: true,
                            message: t('messages.emptyCaptcha'),
                        },
                    ]}
                >
                    <ReCAPTCHA
                        sitekey={process.env.CAPTCHA_KEY}
                        size="compact"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" className="float-right" htmlType="submit">
                        {t('common.register')}
                    </Button>
                </Form.Item>
            </Form>
        </RegisterComponentStyled>
    );
};

export default RegisterComponent;
