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
import { userRoomByIdGet } from 'core/api/commands';
import { LoadingPageStyled } from './style';
import { Spin } from 'antd';
import ConversationNoAccess from 'pages/conversation/components/no-access';

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

    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [isAccess, setAccess] = React.useState<boolean>(false);

    const handleStart = async () => {
        try {
            const data = await userRoomByIdGet(slug);
            setAccess(true);
        } catch (e) {
            setAccess(false);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        // check user is login and room exist
        // get room info by slug
        handleStart();
    }, []);

    const valuesForShare: IConversationContextShare = {
        conversationConfig,
        dispatch,
    };

    if (isLoading) {
        return (
            <LoadingPageStyled>
                <Spin size="large" />
            </LoadingPageStyled>
        );
    }

    if (!isLoading && !isAccess) {
        return <ConversationNoAccess />;
    }

    return (
        <ConversationContext.Provider value={valuesForShare}>
            <ConversationWrapper conversationConfig={conversationConfig} />
        </ConversationContext.Provider>
    );
};

export default Conversation;
