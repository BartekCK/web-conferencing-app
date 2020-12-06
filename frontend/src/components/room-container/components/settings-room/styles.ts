import styled from 'styled-components';

const SingleRoomStyled = styled.div`
    margin: 10px 15px;
    display: flex;
    flex-direction: column;
    
    > .title--wrapper {
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 5px;
        padding: 0px 8px;
        border: none;
        align-self: flex-start;
        height: 20px;
        
        > .title {
            cursor: default;
            font-size: 9px;
            color: #000000;
            font-weight: bold;
            text-transform: uppercase;
        }
    }
`;

const InputRoomStyled = styled.div`
    min-width: 350px;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: space-between;
    align-items: center;
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

export { InputRoomStyled, SingleRoomStyled };
