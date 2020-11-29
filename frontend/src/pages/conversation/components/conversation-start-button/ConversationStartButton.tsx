import React from 'react';

// styles
import { ConversationStartButtonStyled } from './style';

// hooks
import { useTranslation } from 'react-i18next';

// components
import { Button } from 'antd';

// context
import ConversationContext from '../../provider';

// types
import { IConversationContextShare } from '../../types';

// actions
import { setPlaying } from '../../actions';

interface IProps {}

const ConversationStartButton: React.FC<IProps> = (props: IProps) => {
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const { t } = useTranslation();

    const { dispatch } = React.useContext<IConversationContextShare>(
        ConversationContext,
    );

    const handleJoinClick = () => {
        setLoading(true);
        // TODO: Sprawdz czy uzytkownik jest w grupie roomu albo czy jest wlascicielem jak nie to wyslij soketa
        setTimeout(() => {
            dispatch(setPlaying(true));
        }, 2000);
    };

    return (
        <ConversationStartButtonStyled isLoading={isLoading}>
            <span className="title">{t('messages.joinAsk')}</span>
            <Button
                type="dashed"
                size="large"
                onClick={handleJoinClick}
                loading={isLoading}
            >
                {t('common.join')}
            </Button>
            <span className="footer">{t('messages.waitAnswer')}</span>
        </ConversationStartButtonStyled>
    );
};

export default ConversationStartButton;
