import React from 'react';
import { useParams } from 'react-router-dom';
import ConversationContext from './provider';
import conversationReducer from './reducers';
import { IConversation } from 'pages/conversation/types';
import Video from 'components/video';

const initialState: IConversation = {
    isPlaying: false,
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

    return (
        <ConversationContext.Provider
            value={{
                conversationConfig,
                dispatch,
            }}
        >
            <Video />
        </ConversationContext.Provider>
    );
};

export default Conversation;
