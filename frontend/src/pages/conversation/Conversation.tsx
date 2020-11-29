import React from 'react';
import { useParams } from 'react-router-dom';
import ConversationContext from './provider';
import conversationReducer from './reducers';
import { IConversation, IConversationContextShare } from 'pages/conversation/types';
import ConversationWrapper from 'pages/conversation/ConversationWrapper';

const initialState: IConversation = {
    isPlaying: false,
    devices: {
        microphoneDeviceID: 'default',
        speakersDeviceID: 'default',
        videoDeviceID: 'default',
    },
};

const Conversation: React.FC = () => {
    const { slug } = useParams();

    const [conversationConfig, dispatch] = React.useReducer(
        conversationReducer,
        initialState,
    );

    React.useEffect(() => {
        // check user is login and room exist
    }, []);

    const valuesForShare: IConversationContextShare = {
        conversationConfig,
        dispatch,
    };

    return (
        <ConversationContext.Provider
            value={valuesForShare}
        >
            <ConversationWrapper conversationConfig={conversationConfig} />
        </ConversationContext.Provider>
    );
};

export default Conversation;
