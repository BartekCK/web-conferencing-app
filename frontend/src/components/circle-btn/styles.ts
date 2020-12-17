import styled from 'styled-components';

interface IProps {
    isTurnOn?: boolean;
}

export const CircleBtnStyled = styled.button<IProps>`
    width: 60px;
    height: 60px;
    color: #ffffff;
    padding: 0;
    margin: 0;
    border-radius: 100%;
    border: none;
    font-size: 1.4em;
    background: ${({ isTurnOn }: IProps) => (isTurnOn ? 'green' : 'red')};
    cursor: pointer;
    &:focus {
        outline: none;
    }
    &:hover {
        opacity: 0.8;
    }
`;
