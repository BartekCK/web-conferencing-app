import React from 'react';
import { ConversationStartButtonStyled } from 'pages/conversation/components/conversation-start-button/style';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

interface IProps {}

const ConversationStartButton: React.FC<IProps> = (props: IProps) => {
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const { t } = useTranslation();

    const handleJoinClick = () => {
        setLoading(true);
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
