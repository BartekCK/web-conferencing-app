import React from 'react';
import { IConversation } from 'pages/conversation/types';
import ConversationPrepare from 'pages/conversation/containers/conversation-prepare';
import ConversationStart from 'pages/conversation/containers/conversation-start';

interface IProps {
    conversationConfig: IConversation;
}

const ConversationWrapper: React.FC<IProps> = ({
    conversationConfig,
}: IProps) => {
    if (conversationConfig.isPlaying) {
        return <ConversationStart />;
    }
    return <ConversationPrepare />;
};

export default ConversationWrapper;
