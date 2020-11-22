import React from 'react';
import CustomAvatar from 'components/avatar/Avatar';
import { UserComponentStyled } from 'components/user-component/styles';

const UserComponent: React.FC = () => {
    return (
        <UserComponentStyled>
            {/* eslint-disable-next-line max-len */}
            <CustomAvatar imgSrc="https://store-images.s-microsoft.com/image/apps.23952.13510798887611042.610ae026-cc3d-4b4e-9044-1b8721988d93.876c0225-be52-4dab-849f-dee26d8f83ab?mode=scale&q=90&h=270&w=270&background=%23107C10" />
        </UserComponentStyled>
    );
};

export default UserComponent;
