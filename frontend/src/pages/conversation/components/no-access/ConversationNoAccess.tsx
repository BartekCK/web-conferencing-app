import React from 'react';
import { ConversationNoAccessStyled } from './styles';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const ConversationNoAccess: React.FC = () => {
    const [count, setCount] = React.useState<number>(10);
    const { t } = useTranslation();
    const history = useHistory();
    let timer;

    React.useEffect(() => {
        timer = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    React.useEffect(() => {
        if (count <= 0) {
            history.push('/');
        }
    }, [count]);

    return (
        <ConversationNoAccessStyled>
            <div className="content">
                <h1>{t('messages.noAccessRoom')}</h1>
                <p>{count}</p>
            </div>
        </ConversationNoAccessStyled>
    );
};

export default ConversationNoAccess;
