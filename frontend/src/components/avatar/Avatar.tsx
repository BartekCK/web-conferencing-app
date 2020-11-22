import React from 'react';

// styles
import CustomAvatarStyled from 'components/avatar/styles';

// icons
import { UserOutlined } from '@ant-design/icons';

interface IProps {
    imgSrc?: string;
}

const CustomAvatar: React.FC<IProps> = (props: IProps) => {
    const { imgSrc } = props;

    return (
        <CustomAvatarStyled imgSrc={imgSrc}>
            {!imgSrc && <UserOutlined />}
        </CustomAvatarStyled>
    );
};

export default CustomAvatar;
