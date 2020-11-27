import React from 'react';

// types
import { IConversationContext } from '../types';

const initConversationContext: IConversationContext = {
    conversationConfig: null,
    dispatch: null,
};

const ConversationContext: React.Context<IConversationContext> = React.createContext<
    IConversationContext
>(initConversationContext);

export default ConversationContext;
