import styled, { keyframes } from 'styled-components';

interface IProps {
    isOpen: boolean;
}

const ConversationMessageStyles = styled.div<IProps>`
    background: #212121;
    width: 350px;
    display: ${({ isOpen }: IProps) => (isOpen ? 'block' : 'none')};
`;

export { ConversationMessageStyles };
