import React from 'react';

// utils
import { v4 as uuidv4 } from 'uuid';

// styles
import { RoomContainerStyled } from './styles';

// types
import { ISingleRoom } from 'core/types';

// components
import SingleRoom from './components/single-room';
import { Empty, Input, Spin } from 'antd';

// icons
import { SearchOutlined } from '@ant-design/icons';

// hooks
import { useTranslation } from 'react-i18next';
import useDelayExecution from 'custom--hooks/useDelayExecution';

const RoomContainer: React.FC = () => {
    const [rooms, setRooms] = React.useState<ISingleRoom[]>([]);
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [filterList, setFilterList] = React.useState<ISingleRoom[]>([]);
    const [inputValue, setInputValue] = React.useState<string>('');
    const { t } = useTranslation();

    React.useEffect(() => {
        // Get all rooms list
        const temp: ISingleRoom[] = [];
        for (let i = 0; i < 15; i += 1) {
            temp.push({
                id: uuidv4(),
                roomCode: uuidv4().slice(0, -18),
                name: uuidv4().slice(32),
                roomMates: [],
                roomOwner: uuidv4().slice(32),
            });
        }
        setRooms(temp);
    }, []);

    React.useEffect(() => {
        if (!inputValue) {
            setFilterList([]);
        }
    }, [inputValue]);

    const searchInList = async () => {
        setLoading(true);
        const temp = () => new Promise((resolve) => setTimeout(resolve, 1000));
        await temp();
        const result: ISingleRoom[] = rooms.filter((room: ISingleRoom) => {
            return Object.keys(room).some((value: string) => room[value].includes(inputValue));
        });
        setFilterList(result);
    };

    const finallyCallback = () => {
        setLoading(false);
    };
    const [ref] = useDelayExecution(searchInList, 500, finallyCallback);

    const handleChange = (event) => {
        const { value } = event.target;
        setInputValue(value);
    };

    const renderSingleRoom = () => {
        if (filterList.length > 0) {
            return filterList.map((singleRoom: ISingleRoom) => (
                <SingleRoom key={singleRoom.id} singleRoom={singleRoom} />
            ));
        }
        if (rooms.length > 0 && inputValue === '') {
            return rooms.map((singleRoom: ISingleRoom) => (
                <SingleRoom key={singleRoom.id} singleRoom={singleRoom} />
            ));
        }
        return (
            <Empty
                description={
                    <button
                        type="button"
                        className="ant-btn ant-btn-primary "
                    >
                        {t('messages.emptyResult')}
                    </button>
                }
            />
        );
    };

    return (
        <RoomContainerStyled>
            <div ref={ref}>
                <Input
                    className="mb-2"
                    placeholder={`${t('common.search')} ...`}
                    prefix={<SearchOutlined />}
                    onChange={handleChange}
                />
            </div>
            <Spin spinning={isLoading}>
                <div className="rooms--wrapper">{renderSingleRoom()}</div>
            </Spin>
        </RoomContainerStyled>
    );
};

export default RoomContainer;
