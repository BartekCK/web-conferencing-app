import React from 'react';
import { CircleBtnStyled } from './styles';

interface IProps {
    children: React.ReactChild;
    className?: string;
    isTurnOn?: boolean;
    onClick: (event) => void;
}
const CircleBtn: React.FC<IProps> = (props: IProps) => {
    const {
        children, className, onClick, isTurnOn,
    } = props;
    return (
        <CircleBtnStyled isTurnOn={isTurnOn} className={className} onClick={onClick}>
            {children}
        </CircleBtnStyled>
    );
};

export default CircleBtn;
