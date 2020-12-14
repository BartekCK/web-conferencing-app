import styled, { keyframes } from 'styled-components';

interface IProps {
    isEmojiVisible: boolean;
}

const SidebarStyled = styled.div<{ isOpen: boolean }>`
  width: 350px;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  background: #212121;

  .ant-tabs-tab {
    margin: 0 15px;
  }

  .ant-tabs-tab-btn {
    color: #c1c1c1;
  }
`;

const ConversationMessageStyles = styled.div<IProps>`
    background: #212121;
    width: 100%;
    display: flex;
    flex-direction: column;

    > .messages--wrapper {
        height: 659px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        overflow: auto;
        align-items: center;
        width: 350px;

        > .is--typing {
            color: #797979;
            padding: 5px;
            font-size: 10px;
            font-weight: bold;
            background: #ffffff;
            border-radius: 15px;
            margin: 5px;
            align-self: flex-start;
        }
    }

    .messages--wrapper:first-child {
        margin-top: auto !important;
    }

    > .send--wrapper {
        display: flex;
        align-items: flex-end;
        > .emoi {
            position: relative;

            > .picker {
                z-index: 10;
                position: absolute;
                top: -10px;
                right: 0;
                transform: translate(25%, -100%);
                display: ${({ isEmojiVisible }) =>
        isEmojiVisible ? 'block' : 'none'};
            }

            > .emoji-picker-react {
            }
        }
    }
`;

const SingleMessageStyled = styled.div<{ isCurrentUser: boolean }>`
    margin: 10px;
    background: ${({ isCurrentUser }) => (isCurrentUser ? '#ffffff' : '#3f66ff')};
    color: ${({ isCurrentUser }) => (isCurrentUser ? '#000000' : '#ffffff')};
    border-radius: 15px;
    padding: 10px;
    width: 300px;
    font-size: 12px;
    align-self: ${({ isCurrentUser }) =>
        isCurrentUser ? 'flex-start' : 'flex-end'};

    > .header {
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        font-size: 0.8em;
    }

    > .content {
        margin: 10px 0;
        max-width: 100%;
        height: auto;
        word-break: break-all;
    }
`;

export { SidebarStyled, ConversationMessageStyles, SingleMessageStyled };
