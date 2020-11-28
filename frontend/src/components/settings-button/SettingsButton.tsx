import React from 'react';

// icons
import { SettingOutlined } from '@ant-design/icons';

interface IProps {
    handleClick: () => void;
}

const SettingsButton: React.FC<IProps> = (props: IProps) => {
    const { handleClick } = props;

    return (
        <button
            type="button"
            className="btn-setting ant-btn-link "
            onClick={handleClick}
        >
            <SettingOutlined />
        </button>
    );
};

export default SettingsButton;
