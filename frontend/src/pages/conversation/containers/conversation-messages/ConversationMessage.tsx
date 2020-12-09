import React from 'react';
import { ConversationMessageStyles } from './style';

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

    return (
        <ConversationMessageStyles isOpen={isMessagesOpen}>
            Ala ma kota
        </ConversationMessageStyles>
    );
};

export default ConversationMessage;
