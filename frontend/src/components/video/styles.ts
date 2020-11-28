import styled, { keyframes } from 'styled-components';

export const VideoStyled = styled.div`
    position: relative;

    width: 500px;
    > .user-video {
        width: 100%;
        height: 100%;
    }
    > .audio--container {
        position: absolute;
        bottom: 20px;
        right: 20px;
    }
`;
