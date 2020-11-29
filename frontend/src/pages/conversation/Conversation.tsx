import React from 'react';

// hooks
import { useParams } from 'react-router-dom';

// context
import ConversationContext from './provider';
import conversationReducer from './reducers';

// types
import { IConversation, IConversationContextShare } from './types';

// components
import ConversationWrapper from './ConversationWrapper';

const initialState: IConversation = {
    isPlaying: false,
    devices: {
        microphoneDeviceID: 'default',
        speakersDeviceID: 'default',
        videoDeviceID: 'default',
    },
    currentRoom: null,
};

const Conversation: React.FC = () => {
    const { slug } = useParams();

    const [conversationConfig, dispatch] = React.useReducer(
        conversationReducer,
        initialState,
    );

    React.useEffect(() => {
        // check user is login and room exist
        // get room info by slug
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
