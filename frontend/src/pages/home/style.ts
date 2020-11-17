import styled from 'styled-components';
import BackgroundImage from '../../assets/home/background.jpg';

export const HomeStyled = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    > .left {
        flex: 0.4;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 60px;

        > .button--section {
            display: flex;
        }
    }
    > .right {
        flex: 0.6;
        background: url(${BackgroundImage});
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
