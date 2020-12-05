import React from 'react';
// styles
import { HomeStyled } from './style';
// hooks
import { useTranslation } from 'react-i18next';

// components
import CredentialFactory from 'container/credential-factory';
import { useSelector } from 'react-redux';
import { IStore } from 'core/store/types';
import { Popover } from 'antd';

const Home: React.FC = () => {
    const [textLink, setTextLink] = React.useState<string>('');

    const { t } = useTranslation();
    const { user } = useSelector((state: IStore) => state.auth);

    const handleChange = (event) => {
        setTextLink(event.target.value);
    };

    return (
        <HomeStyled>
            <div className="left d-md-5">
                <h1>{t('home.header')}</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry s standard dummy text
                    ever since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book. It has
                    survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged.
                </p>
                <div className="button--section">
                    <button
                        disabled={!user}
                        className="ant-btn ant-btn-primary mx-2"
                        type="button"
                    >
                        {t('common.newMeet')}
                    </button>
                    <input
                        type="text"
                        className="ant-input mx-2"
                        onChange={handleChange}
                    />
                    <button
                        disabled={textLink.length === 0}
                        className="ant-btn ant-btn-primary mx-2"
                        type="button"
                    >
                        <i className="fa fa-caret-right" aria-hidden="true" />
                    </button>
                </div>
            </div>
            <div className="right d-md-7">
                <CredentialFactory />
            </div>
        </HomeStyled>
    );
};

export default Home;
