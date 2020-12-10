import React from 'react';
import { SingleMessageStyled } from './style';

interface IProps {
    message: string;
    author: string;
    date: string;
}

const SingleMessage: React.FC<IProps> = (props: IProps) => {
    const { message, author, date } = props;
    return (
        <SingleMessageStyled>
            <div className="header">
                <span className="author">{author}</span>
                <span className="date">{date}</span>
            </div>
            <p className="content">{message}</p>
        </SingleMessageStyled>
    );
};

export default SingleMessage;
