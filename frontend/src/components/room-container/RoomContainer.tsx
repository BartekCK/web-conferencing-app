import React from 'react';

// utils
import { v4 as uuidv4 } from 'uuid';

// styles
import { RoomContainerStyled } from './styles';

// types
import { ISingleRoom } from './types';

// components
import SingleRoom from './components/single-room';
import { Input, Spin } from 'antd';

// icons
import { SearchOutlined } from '@ant-design/icons';

// hooks
import { useTranslation } from 'react-i18next';

const RoomContainer: React.FC = () => {
    const [rooms, setRooms] = React.useState<ISingleRoom[]>([]);
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const { t } = useTranslation();

    React.useEffect(() => {
        // Get all rooms list
        const temp: ISingleRoom[] = [];
        for (let i = 0; i < 15; i += 1) {
            temp.push({
                id: uuidv4(),
                roomCode: uuidv4().slice(0, -18),
                name: 'Ala ma kota',
            });
        }
        setRooms(temp);
    }, []);

    const handleChange = (event) => {
        console.log(event.target.value);
    };

    return (
        <RoomContainerStyled>
            <Input
                className="mb-2"
                placeholder={`${t('common.search')} ...`}
                prefix={<SearchOutlined />}
                onChange={handleChange}
                allowClear
            />
            <Spin spinning={isLoading}>
                <div className="rooms--wrapper">
                    {rooms.length > 0
                        && rooms.map(({ roomCode, name, id }: ISingleRoom) => (
                            <SingleRoom
                                key={id}
                                id={id}
                                name={name}
                                roomCode={roomCode}
                            />
                        ))}
                </div>
            </Spin>
        </RoomContainerStyled>
    );
};

export default RoomContainer;
