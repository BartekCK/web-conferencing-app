import React from 'react';

import { useTranslation } from 'react-i18next';

// components
import { FacebookProvider, LoginButton } from 'react-facebook';
import { loginFacebookPost } from 'core/api/commands';
import { dispatchSetCurrentUser } from 'core/store/slices/auth.slice';
import { useDispatch } from 'react-redux';

const FacebookLoginButton: React.FC = () => {
    const dispatch = useDispatch();

    const handleFacebookLogin = async (event) => {
        const data = await loginFacebookPost(event.profile);
        dispatch(dispatchSetCurrentUser(data));
    };

    const { t } = useTranslation();

    return (
        <FacebookProvider appId={process.env.FACEBOOK_APP_ID}>
            <LoginButton
                scope="email"
                onCompleted={handleFacebookLogin}
                className="ant-btn ant-btn-primary px-0"
            >
                <i className="fa fa-facebook mx-2" aria-hidden="true" />
                <span className="mr-2">{t('common.signInByFacebook')}</span>
            </LoginButton>
        </FacebookProvider>
    );
};

export default FacebookLoginButton;
