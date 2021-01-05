import React from 'react';
// styles
import { LoginComponentStyled } from './styles';

// hooks
import { useTranslation } from 'react-i18next';

// components
import FacebookLoginButton from 'components/button-facebook';
import {
    Form, Input, Button, notification,
} from 'antd';

// assets
import LogoSvg from 'assets/home/logo.svg';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

// store
import { useDispatch } from 'react-redux';
import { dispatchSetCurrentLayout } from 'core/store/slices/config.slice';
import { dispatchSetCurrentUser } from 'core/store/slices/auth.slice';

// types
import { LayoutType } from 'core/store/types/enum';
import { loginUserPost } from 'core/api/commands';
import { IUser } from 'core/types';

const LoginComponent: React.FC = () => {
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const handleSignUp = React.useCallback(() => {
        dispatch(dispatchSetCurrentLayout(LayoutType.REGISTER_LAYOUT));
    }, [dispatch]);

    const onFinish = async (user: IUser) => {
        try {
            const data: IUser = await loginUserPost(user);
            dispatch(dispatchSetCurrentUser(data));
        } catch (e) {
            notification.error({
                message: t('common.error'),
                description: t('messages.commonError'),
                placement: 'topLeft',
                duration: 2,
            });
        }
    };

    return (
        <LoginComponentStyled>
            <div className="logo--component">
                <img className="logo" src={LogoSvg} alt="logo" />
                <span className="title">Be Meet</span>
            </div>
            <Form name="normal_login" onFinish={onFinish}>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: t('messages.emptyEmail') }]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder={t('common.email')}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: t('messages.emptyPassword') },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder={t('common.password')}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button float-right"
                    >
                        {t('common.signIn')}
                    </Button>
                </Form.Item>
            </Form>

            <div className="footer">
                <FacebookLoginButton />
                <button
                    type="button"
                    className="ant-btn ant-btn-ghost my-2"
                    onClick={handleSignUp}
                    data-test="registerBtnTest"
                >
                    {t('common.signUp')}
                </button>
            </div>
        </LoginComponentStyled>
    );
};

export default LoginComponent;
