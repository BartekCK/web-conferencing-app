import React from 'react';
import { useParams } from 'react-router-dom';

const Conversation: React.FC = () => {
    const { slug } = useParams();

    React.useEffect(() => {
        // check user is login and room exist
    }, []);

    return <div>{slug}</div>;
};

export default Conversation;
