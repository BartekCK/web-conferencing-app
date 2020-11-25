import React from 'react';

// utils
import { v4 as uuidv4 } from 'uuid';

// styles
import { RoomContainerStyled } from './styles';

// types
import { ISingleRoom } from './types';

// components
import SingleRoom from './components/single-room';

const RoomContainer:React.FC = () => {
    const [rooms, setRooms] = React.useState<ISingleRoom[]>([]);

    React.useEffect(() => {
        // Get all rooms list
        const temp: ISingleRoom[] = [];
        for (let i = 0; i < 100; i += 1) {
            temp.push({ roomCode: uuidv4().slice(0, -18) });
        }
        setRooms(temp);
    }, []);

    return (
        <RoomContainerStyled>
            {rooms.length > 0
                && rooms.map(({ roomCode }: ISingleRoom) => (
                    <SingleRoom roomCode={roomCode} />
                ))}
        </RoomContainerStyled>
    );
};

export default RoomContainer;
