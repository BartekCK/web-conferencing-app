import React from 'react';
import { AudioStyled } from './styles';
import { Select } from 'antd';

interface IProps {
    devices: any;
    kind: string;
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
}

const InputOutputSelect: React.FC<IProps> = (props: IProps) => {
    const {
        devices, kind, placeholder, onChange, value,
    } = props;

    const { Option } = Select;

    return (
        <div className="mb-3">
            <span className="">{placeholder}</span>
            <Select
                style={{ width: '100%' }}
                showSearch
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            >
                {devices.map(
                    (device) =>
                        device.kind === kind && (
                            <Option key={device.deviceId} value={device.deviceId}>
                                {device.label}
                            </Option>
                        ),
                )}
            </Select>
        </div>
    );
};

export default React.memo(InputOutputSelect);
