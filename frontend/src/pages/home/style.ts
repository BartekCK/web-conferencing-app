import styled, { keyframes } from 'styled-components';
import BackgroundImage from '../../assets/home/background.jpg';

const textAnimation = keyframes`
from{
  opacity: 0;
  
}
to{
  opacity: 1;
}`;

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
            position: relative;
        }

        > .quote {
            font-style: italic;
            animation: ${textAnimation} 1.4s alternate;
        }
    }
    > .right {
        flex: 0.6;
        background: url(${BackgroundImage});
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
    }
`;
