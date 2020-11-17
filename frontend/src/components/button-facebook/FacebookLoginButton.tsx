import React from 'react';

import { useTranslation } from 'react-i18next';

// components
import { FacebookProvider, LoginButton } from 'react-facebook';

const FacebookLoginButton: React.FC = () => {
    const handleFacebookLogin = (event) => {
        // TODO: Dodac forme logowania przez fb (api post)
        console.log(event);
    };

    const { t } = useTranslation();

    return (
        <FacebookProvider appId={process.env.FACEBOOK_APP_ID}>
            <LoginButton
                scope="email"
                onCompleted={handleFacebookLogin}
                className="ant-btn ant-btn-primary px-0"
                // onError={this.handleError}
            >
                <i className="fa fa-facebook mx-2" aria-hidden="true" />
                <span className="mr-2">{t('common.signInByFacebook')}</span>
            </LoginButton>
        </FacebookProvider>
    );
};

export default FacebookLoginButton;
