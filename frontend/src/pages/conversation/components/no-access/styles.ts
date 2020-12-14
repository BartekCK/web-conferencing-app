import styled from 'styled-components';

const ConversationNoAccessStyled = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    > .content {
        box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
            0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
        padding: 20px;

        > h1 {
            font-weight: lighter;
            max-width: 450px;
            text-align: center;
        }

        > p {
            text-align: center;
            color: #1010ff;
            font-weight: bold;
            margin: 20px;
        }
    }
`;

export { ConversationNoAccessStyled };
