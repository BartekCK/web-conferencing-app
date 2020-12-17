import React from 'react';

// styles
import { AudioStyled } from './styles';

interface IProps {
    microPower: number;
    className?: string;
}
const Audio: React.FC<IProps> = ({ microPower }: IProps) => {
    const calculateColor = (): string => {
        switch (true) {
        case microPower >= 24 && microPower < 48:
            return 'green';
        case microPower >= 48 && microPower < 72:
            return 'yellow';
        case microPower >= 72 && microPower < 96:
            return 'orange';
        case microPower >= 96:
            return 'red';
        default:
            return 'blue';
        }
    };

    const calculateTransform = () => {
        switch (true) {
        case microPower >= 24 && microPower < 48:
            return 'scale(0.8,0.4)';
        case microPower >= 48 && microPower < 72:
            return 'scale(0.8,0.6)';
        case microPower >= 72 && microPower < 96:
            return 'scale(0.6,0.8)';
        case microPower >= 96:
            return 'scale(0.6,1)';
        default:
            return 'scale(1,0.2)';
        }
    };

    return (
        <AudioStyled className="audio--container d-flex">
            <div
                className="audio"
                style={{
                    backgroundColor: calculateColor(),
                    transform: calculateTransform(),
                }}
            />
            <div
                className="audio"
                style={{
                    backgroundColor: calculateColor(),
                    transform: calculateTransform(),
                }}
            />
            <div
                className="audio"
                style={{
                    backgroundColor: calculateColor(),
                    transform: calculateTransform(),
                }}
            />
        </AudioStyled>
    );
};

export default React.memo(Audio);
