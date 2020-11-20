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

export const RegisterComponentStyled = styled.div`
    animation: ${slideIn} 0.8s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
    background: rgba(255, 255, 255, 0.75);
    width: 60%;
    padding: 20px;

    min-width: 350px;
`;
