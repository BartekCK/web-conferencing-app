import React from 'react';
// styles
import { HomeStyled } from './style';
// hooks
import { useTranslation } from 'react-i18next';

// components
import CredentialFactory from 'container/credential-factory';
import { useSelector } from 'react-redux';
import { IStore } from 'core/store/types';
import { createRoomPost } from 'core/api/commands';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { notification } from 'antd';
import { ISingleRoom } from 'core/types';

import { quotes } from './data';

const Home: React.FC = () => {
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    const [textLink, setTextLink] = React.useState<string>('');

    const { t, i18n } = useTranslation();
    const { user } = useSelector((state: IStore) => state.auth);
    const history = useHistory();

    const handleChange = (event) => {
        setTextLink(event.target.value);
    };

    const handleCreateRoomClick = async () => {
        try {
            const data: ISingleRoom = await createRoomPost(uuidv4().slice(0, -18));
            history.push(`/conversation/${data.roomCode}`);
        } catch (e) {
            notification.error({
                message: t('common.error'),
                description: t('messages.commonError'),
                placement: 'topLeft',
                duration: 2,
            });
        }
    };

    const lastNumberRef = React.useRef<number>(getRandomInt(0, quotes.length));
    const [quote, setQuote] = React.useState<{
        pl: string;
        en: string;
        author: string;
    } | null>(quotes[lastNumberRef.current]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            let rand: number = getRandomInt(0, quotes.length);
            while (rand === lastNumberRef.current) {
                rand = getRandomInt(0, quotes.length);
            }
            lastNumberRef.current = rand;
            const data = quotes[rand];
            setQuote(null);
            setQuote(data);
        }, 9000);
        return () => clearInterval(interval);
    }, []);

    const handleBtnClick = () => {
        history.push(`/conversation/${textLink}`);
    };

    const renderQuote = React.useCallback(() => {
        if (quote) {
            return (
                <div className="quote">
                    <q className="">{quote[i18n.language]}</q>
                    <p className="text-right font-weight-light font-italic">
                        &mdash;
                        {quote.author}
                    </p>
                </div>
            );
        }
        return null;
    }, [quote, i18n.language]);

    return (
        <HomeStyled>
            <div className="left d-md-5">
                <h1>{t('home.header')}</h1>
                {renderQuote()}
                <div className="button--section">
                    <button
                        disabled={!user}
                        className="ant-btn ant-btn-primary mx-2"
                        type="button"
                        data-test="newMeetTest"
                        onClick={handleCreateRoomClick}
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
                        onClick={handleBtnClick}
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
