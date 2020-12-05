import React from 'react';

import { useTranslation } from 'react-i18next';

// components
import { FacebookProvider, LoginButton } from 'react-facebook';
import { loginFacebookPost } from 'core/api/commands';

const FacebookLoginButton: React.FC = () => {
    // const [cookies, setCookie, removeCookie] = useCookies();

    const handleFacebookLogin = async (event) => {
        await loginFacebookPost(event.profile);
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
