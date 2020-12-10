import React from 'react';
import { ConversationMessageStyles } from './style';
import { Button, Input } from 'antd';
import SingleMessage from 'pages/conversation/containers/conversation-messages/SingleMessage';
import { IMessage } from 'core/types';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { IStore } from 'core/store/types';
import { useTranslation } from 'react-i18next';

interface IProps {
    isMessagesOpen: boolean;
}

declare global {
    interface Window {
        stream: any;
    }
}

const ConversationMessage: React.FC<IProps> = (props: IProps) => {
    const { isMessagesOpen } = props;
    const [inputValue, setInputValue] = React.useState<string>('');
    const [messages, setMessages] = React.useState<IMessage[]>([]);

    const { user } = useSelector((state: IStore) => state.auth);
    const { t } = useTranslation();

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const sendMessage = () => {
        if (inputValue.length <= 0 || !user) return;
        const newMessage: IMessage = {
            author: user.email,
            date: moment().format('DD.MM.YYYY, HH:mm'),
            message: inputValue,
        };
        setMessages((prev) => [...prev, newMessage]);
        setInputValue('');
    };

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.key !== 'Enter') return;
        sendMessage();
    };

    return (
        <ConversationMessageStyles isOpen={isMessagesOpen}>
            <div className="messages--wrapper">
                {messages.map((message, idx) => (
                    <SingleMessage
                        key={idx}
                        message={message.message}
                        author={message.author}
                        date={message.date}
                    />
                ))}
            </div>
            <div className="d-flex">
                <Input
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={onKeyDown}
                />
                <Button className="" type="primary" onClick={sendMessage}>
                    {t('common.send')}
                </Button>
            </div>
        </ConversationMessageStyles>
    );
};

export default ConversationMessage;
