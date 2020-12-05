import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(50%);
    opacity: 0;
  }

  to {
    transform:  translateX(0);
    opacity: 1;
  }
`;

const RoomContainerStyled = styled.div`
    animation: ${slideIn} 0.8s ease-in-out;
    .rooms--wrapper {
        background: rgba(255, 255, 255, 0.4);
        max-height: 500px;
        overflow: auto;
        min-width: 350px;
    }
`;

export { RoomContainerStyled };
