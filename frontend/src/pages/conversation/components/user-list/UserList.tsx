import React from 'react';
import { IUserList } from 'core/types';
import { UserListStyles } from './styles';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface IProps {
    userList: IUserList[];
}

const UserList: React.FC<IProps> = ({ userList }: IProps) => {
    return (
        <UserListStyles>
            {userList.map((el, idx) => (
                <div className="item ant-input" key={el.socketId}>
                    <Avatar
                        src={
                            el.userImage
                                ? `${process.env.API_HOST}${el.userImage}`
                                : undefined
                        }
                        icon={!el.userImage ? <UserOutlined /> : undefined}
                        size={40}
                        className="mx-2"
                    />
                    {el.email}
                </div>
            ))}
        </UserListStyles>
    );
};

export default UserList;
