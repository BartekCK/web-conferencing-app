import styled from 'styled-components';

export const UserListStyles = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    > .item {
        font-weight: bold;
        margin: 5px 0;
        padding: 5px;
        background: #fff;
    }
`;
