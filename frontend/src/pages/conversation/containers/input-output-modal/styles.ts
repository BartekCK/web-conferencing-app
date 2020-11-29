import styled, { keyframes } from 'styled-components';

interface IProps {
    imgSrc?: string;
}

const shake = keyframes`
  0% {
    transform:  translate(0, 0);
  }
  25% {
    transform: translate(0,-3%);
  }
  30%{
  transform: translate(0,0);
  }
  35% {
    transform:  translate(0,3%);
  }
  40%, 100% {
    transform:  translate(0, 0);
  }
`;

const fillBackground = (imgSrc?: string) => {
    if (imgSrc) {
        return `background: url(${imgSrc}) no-repeat;
        background-size: contain`;
    }
    return 'background: rgba(255, 255, 255 0.8);';
};

const CustomAvatarStyled = styled.button<IProps>`
    padding: 0;
    overflow: hidden;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    ${({ imgSrc }: IProps) => fillBackground(imgSrc)};
    position: fixed;
    top: 15px;
    right: 15px;
    border: none;
    display: block;
    outline: none;
    animation: ${shake} 3s infinite linear;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`;

export default CustomAvatarStyled;
