import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }

  to {
    transform:  translateY(0);
    opacity: 1;
  }
`;

export const LoginComponentStyled = styled.div`
    animation: ${slideIn} 0.8s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
    background: rgba(255, 255, 255, 0.75);
    width: 60%;
    padding: 20px;
    height: 50%;
    > .logo--component {
        display: flex;
        align-items: center;
        > .title {
            font-size: 20px;
            font-weight: lighter;
        }
        > .logo {
            width: 50px;
            height: 50px;
            margin-right: 10px;
        }
    }
    > .footer {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
`;
