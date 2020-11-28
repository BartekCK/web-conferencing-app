import styled from 'styled-components';

export const VideoStyled = styled.div`
    position: relative;
    width: 600px;
    height: 450px;
    > .user-video {
        width: 600px;
        height: auto;
    }
    > .audio--container {
        position: absolute;
        bottom: 20px;
        right: 20px;
    }
    > .btn-setting {
        position: absolute;
        top: 20px;
        right: 20px;
        background: transparent;
    }
`;
