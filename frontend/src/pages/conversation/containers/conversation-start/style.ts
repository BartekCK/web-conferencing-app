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
        .user--video {
        }
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

        position: relative;
        overflow: auto;
        //flex: 0.7;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        background: url(${ImageBackground});
        flex-grow: 1;
      
        video {
            width: 450px;
            height: auto;
            margin: 20px;
        }
    }
`;

export { ConversationStartStyled };
