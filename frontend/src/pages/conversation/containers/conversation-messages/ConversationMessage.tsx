import React from 'react';
import { ConversationMessageStyles } from './style';
import { Button, Input } from 'antd';
import SingleMessage from 'pages/conversation/containers/conversation-messages/SingleMessage';
import { IMessage, IUser } from 'core/types';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { IStore } from 'core/store/types';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { addRoomImagePost } from 'core/api/commands';
import { useParams } from 'react-router-dom';

interface IProps {
    isMessagesOpen: boolean;
    user: IUser;
}

declare global {
    interface Window {
        stream: any;
    }
}

const ConversationMessage = React.forwardRef(
    (
        props: IProps,
        socketRef: React.MutableRefObject<SocketIOClient.Socket | null>,
    ) => {
        const { isMessagesOpen, user } = props;
        const [inputValue, setInputValue] = React.useState<string>('');
        const [messages, setMessages] = React.useState<IMessage[]>([]);
        const [isTyping, setTyping] = React.useState<string>('');
        const { slug } = useParams();
        const { t } = useTranslation();

        const onDrop = React.useCallback((acceptedFiles) => {
            acceptedFiles.forEach(async (file) => {
                if (!socketRef.current) return;
                const formData = new FormData();
                formData.append('file', file);
                formData.append('file_name', file.name);
                const imagePath = await addRoomImagePost(slug, formData);
                const newMessage: IMessage = {
                    author: user.email,
                    date: moment().format('DD.MM.YYYY, HH:mm'),
                    message: process.env.API_HOST + imagePath,
                    isFile: true,
                };
                setMessages((prev) => [...prev, newMessage]);
                socketRef.current.emit('send-message', newMessage);
                setInputValue('');
            });
        }, []);

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
        });

        let typingTimer;

        React.useEffect(() => {
            if (!socketRef.current) return;
            socketRef.current.on('receive-message', (data: IMessage) => {
                setMessages((prev) => [...prev, data]);
            });

            socketRef.current.on('receive-is-typing', (email: string) => {
                setTyping(email);
                clearTimeout(typingTimer);
                typingTimer = setTimeout(() => {
                    setTyping('');
                }, 1000);
            });
        }, [socketRef]);

        const handleChange = (event) => {
            if (!socketRef.current || !user) return;
            setInputValue(event.target.value);
            socketRef.current.emit('send-is-typing', user.email);
        };

        const sendMessage = () => {
            if (inputValue.length <= 0 || !user || !socketRef.current) return;
            const newMessage: IMessage = {
                author: user.email,
                date: moment().format('DD.MM.YYYY, HH:mm'),
                message: inputValue,
                isFile: false,
            };
            setMessages((prev) => [...prev, newMessage]);
            socketRef.current.emit('send-message', newMessage);
            setInputValue('');
        };

        const onKeyDown = (event: React.KeyboardEvent) => {
            if (event.key !== 'Enter') return;
            sendMessage();
        };

        return (
            <ConversationMessageStyles isOpen={isMessagesOpen}>
                <div className="messages--wrapper" {...getRootProps()}>
                    <input {...getInputProps()} />
                    {messages.map((message, idx) => (
                        <SingleMessage
                            user={user}
                            key={idx}
                            message={message.message}
                            author={message.author}
                            date={message.date}
                            isFile={message.isFile}
                        />
                    ))}
                </div>
                {isTyping && (
                    <div className="is--typing">
                        {`${isTyping} ${t('common.isWriting')}`}
                    </div>
                )}
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
    },
);

export default ConversationMessage;
