import styled, { keyframes } from 'styled-components';

interface IProps {
    isOpen: boolean;
}

const ConversationMessageStyles = styled.div<IProps>`
    background: #212121;
    width: 350px;
    display: ${({ isOpen }: IProps) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    > .messages--wrapper {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        overflow: auto;
        align-items: center;
        width: 350px;
    }
`;
const SingleMessageStyled = styled.div`
    margin: 10px 20px;
    background: #ffffff;
    border-radius: 15px;
    padding: 10px;
    width: 300px;
    font-size: 12px;
    > .header {
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        font-size: 0.8em;
    }
    > .content {
        margin: 10px 0;
    }
`;

export { ConversationMessageStyles, SingleMessageStyled };
