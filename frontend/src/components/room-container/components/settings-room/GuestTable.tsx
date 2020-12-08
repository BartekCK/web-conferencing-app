import React from 'react';
import {
    AutoComplete, Button, Spin, Table,
} from 'antd';
import { userRoomPut, usersEmailsGet } from 'core/api/commands';
import { useTranslation } from 'react-i18next';
import { ISingleRoom, IUser } from 'core/types';

interface IProps {
    singleRoom: ISingleRoom;
    setRoom: any;
}

const GuestTable: React.FC<IProps> = ({ singleRoom, setRoom }: IProps) => {
    const {
        id, roomName, roomCode, owner, guests,
    } = singleRoom;
    const [options, setOptions] = React.useState<{ label: string; value: string }[]>(
        [],
    );
    const [selectEmail, setSelectEmail] = React.useState<string>('');
    const [isLoading, setLoading] = React.useState<boolean>(false);

    const { t } = useTranslation();

    const onSearch = async (searchText: string) => {
        setSelectEmail('');
        if (searchText.length === 0) return;
        const data: { id: string; email: string }[] = await usersEmailsGet(
            searchText,
        );
        setOptions(data.map(({ email }) => ({ label: email, value: email })));
    };
    const onSelect = (data: string) => {
        setSelectEmail(data);
    };

    const handleAddGuest = async () => {
        try {
            setLoading(true);
            const res: { id: string }[] = await usersEmailsGet(selectEmail);
            const temp = [...res.map((el) => el.id), ...(guests || [])];
            const data = await userRoomPut(id, {
                guests: temp,
            });
            setRoom((prev) => {
                prev.guests = [...data.guests];
                return { ...prev };
            });
            setSelectEmail('');
        } finally {
            setLoading(false);
        }
    };

    const deleteFromArr = async ({ key, email }) => {
        try {
            setLoading(true);
            const temp = guests?.filter((el: IUser) => el._id !== key);
            if (!temp) return;
            const res = await userRoomPut(id, {
                guests: temp,
            });
            setRoom((prev) => {
                prev.guests = [...temp];
                return { ...prev };
            });
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (temp) => (
                <Button danger onClick={() => deleteFromArr(temp)}>
                    {t('common.delete')}
                </Button>
            ),
        },
    ];

    return (
        <Spin spinning={isLoading}>
            <div className="row mb-2">
                <AutoComplete
                    options={options}
                    className="col-8 mx-2"
                    onSelect={onSelect}
                    onSearch={onSearch}
                    placeholder={t('common.searchUserByEmail')}
                />
                <Button
                    disabled={selectEmail.length === 0}
                    className="col mx-2"
                    type="primary"
                    onClick={handleAddGuest}
                >
                    {t('common.send')}
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={
                    singleRoom.guests
                        ? singleRoom.guests.map((el: IUser) => ({
                            key: el._id,
                            email: el.email,
                        }))
                        : []
                }
            />
        </Spin>
    );
};

export default GuestTable;
