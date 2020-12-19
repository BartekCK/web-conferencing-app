import React from 'react';

// styles
import CustomAvatarStyled from 'components/avatar/styles';

// icons
import { UserOutlined } from '@ant-design/icons';

interface IProps {
    imgSrc?: string;
    handleClick?: () => void;
}

const CustomAvatar: React.FC<IProps> = (props: IProps) => {
    const { imgSrc, handleClick } = props;

    return (
        <CustomAvatarStyled imgSrc={imgSrc} onClick={handleClick}>
            {!imgSrc && <UserOutlined />}
        </CustomAvatarStyled>
    );
};

export default CustomAvatar;
