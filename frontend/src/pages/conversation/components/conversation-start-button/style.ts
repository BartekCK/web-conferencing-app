import styled, { keyframes } from 'styled-components';

interface IProps {
    isLoading: boolean;
}

const pulse = keyframes`
from{
opacity: 0;
}
to{
opacity: 1;
}
`;

export const ConversationStartButtonStyled = styled.div<IProps>`
    display: flex;
    flex-direction: column;

    > .title {
        font-weight: lighter;
        font-size: 35px;
        margin-bottom: 10px;
    }

    > .footer {
        display: ${({ isLoading }: IProps) => (isLoading ? 'block' : 'none')};
        font-weight: lighter;
        font-size: 20px;
        align-self: center;
        margin-top: 5px;
        animation: ${pulse} 1s alternate infinite ease-in-out;
    }
`;
