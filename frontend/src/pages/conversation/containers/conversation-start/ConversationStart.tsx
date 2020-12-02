import React from 'react';
import SocketService from 'core/services/Socket.service';
import { SocketEvent } from 'core/types/enums';

interface IProps {}

const ConversationStart: React.FC<IProps> = (props: IProps) => {
    const [state, setState] = React.useState<string[]>([]);

    const handleClick = () => {
        setState((prev) => [...prev, 'NEW']);
        SocketService.socket.emit(SocketEvent.SendMessage, 'NEW');
    };

    React.useEffect(() => {
        // SocketService.socket.emit(SocketEvent.RoomJoin, {
        //     name: 'Ala',
        //     surname: 'kot',
        // });
        SocketService.socket.on(SocketEvent.SendMessage, (data) =>
            setState((prev) => [...prev, data]));
    }, []);

    return (
        <div>
            <button type="button" onClick={handleClick}>
                Dodaj
            </button>
            <ul>
                {state.map((el, id) => (
                    <li key={id}>{el}</li>
                ))}
            </ul>
        </div>
    );
};

export default ConversationStart;
