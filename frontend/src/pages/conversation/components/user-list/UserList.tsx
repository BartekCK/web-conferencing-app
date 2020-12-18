import React from 'react';
import { IUserList } from 'core/types';
import { UserListStyles } from './styles';

interface IProps {
    userList: IUserList[];
}

const UserList: React.FC<IProps> = ({ userList }: IProps) => {
    return (
        <UserListStyles>
            {userList.map((el, idx) => (
                <div className="item ant-input" key={el.socketId}>{`${idx + 1}. ${el.email}`}</div>
            ))}
        </UserListStyles>
    );
};

export default UserList;
