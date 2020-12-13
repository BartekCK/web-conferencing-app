import React from 'react';
import { IConversation } from 'pages/conversation/types';
import ConversationPrepare from 'pages/conversation/containers/conversation-prepare';
import ConversationStart from 'pages/conversation/containers/conversation-start';
import { useSelector } from 'react-redux';
import { IStore } from 'core/store/types';

interface IProps {
    conversationConfig: IConversation;
}

const ConversationWrapper: React.FC<IProps> = ({ conversationConfig }: IProps) => {
    const { user } = useSelector((state: IStore) => state.auth);

    if (conversationConfig.isPlaying && user) {
        return <ConversationStart user={user} />;
    }
    return <ConversationPrepare />;
};

export default ConversationWrapper;
