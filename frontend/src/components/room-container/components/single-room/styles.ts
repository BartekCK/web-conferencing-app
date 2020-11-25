import styled from 'styled-components';

const SingleRoomStyled = styled.div`
    min-width: 350px;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px;
    padding: 0;

    > .title {
        text-align: center;
        cursor: pointer;
        background: transparent;
        flex: 0.8;
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
    }

    > .btn-visit {
        flex: 0.2;
    }
`;

export { SingleRoomStyled };
