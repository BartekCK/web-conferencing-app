import React from 'react';
import { SingleMessageStyled } from './style';

interface IProps {
    message: string;
    author: string;
    date: string;
    isFile: boolean;
}

const SingleMessage: React.FC<IProps> = (props: IProps) => {
    const {
        message, author, date, isFile,
    } = props;
    return (
        <SingleMessageStyled>
            <div className="header">
                <span className="author">{author}</span>
                <span className="date">{date}</span>
            </div>
            {isFile ? (
                <img className="content" src={message} alt={message} />
            ) : (
                <p className="content">{message}</p>
            )}
        </SingleMessageStyled>
    );
};

export default SingleMessage;
