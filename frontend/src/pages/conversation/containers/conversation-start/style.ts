import styled from 'styled-components';
import ImageBackground from 'assets/conversation/backgroundConversation.jpg';

interface IProps {
    isMessagesOpen: boolean;
}

const ConversationStartStyled = styled.div<IProps>`
    display: flex;
    //justify-content: stretch;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    > .video--wrapper {
        > .open--bnt {
            position: absolute;
            top: 0;
            right: 0;
            > button {
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 30px;
                height: 30px;
                > span {
                    transform: rotate(
                        ${({ isMessagesOpen }) =>
        isMessagesOpen ? '180deg' : '0deg'}
                    );
                    transition: transform 0.2s ease-in;
                }
            }
        }
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;

        > .user--video {
            margin: 10px;
            position: relative;
            > .tools--wrapper {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }

            > .audio--container {
              position: absolute;
                bottom: 15px;
                right: 15px;
            }
        }

        background: url(${ImageBackground});
        position: relative;
        flex: 1;
        overflow: auto;

        video {
            width: 450px;
            height: auto;
        }
    }
`;

export { ConversationStartStyled };
