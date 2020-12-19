import styled from 'styled-components';

interface IProps {
    isVideo: boolean;
}

export const VideoStyled = styled.div<IProps>`
    position: relative;
    width: 600px;
    height: 450px;
    > .user-video {
        display: ${({ isVideo }: IProps) => (isVideo ? 'block' : 'none')};
        width: 600px;
        height: auto;

        &.disable {
            display: ${({ isVideo }: IProps) => (isVideo ? 'none' : 'block')};
            background: black;
            height: 100%;
            position: relative;
          
           >.avatar{
             left: 50%;
             top: 50%;
             transform: translate(-50%, -50%);
           }
        }
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
    > .tools--wrapper {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
    }
`;
