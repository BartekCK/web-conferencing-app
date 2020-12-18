import React from 'react';
import { SingleMessageStyled } from './style';
import { IUser } from 'core/types';
import { axiosInstance } from 'core/api/config';
import PdfIcon from 'assets/pdfIcon.png';

interface IProps {
    message: string;
    author: string;
    date: string;
    isImage: boolean;
    isPdf: boolean;
    user: IUser;
    resultPath?: string;
}

const SingleMessage: React.FC<IProps> = (props: IProps) => {
    const {
        message, author, date, isImage, isPdf, user, resultPath,
    } = props;

    const handleClick = async () => {
        if (!resultPath) return;
        const encode = encodeURIComponent(resultPath);
        const response = await axiosInstance.get(`/api/upload/${encode}`, {
            responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `file.${isImage ? 'jpeg' : 'pdf'}`);
        document.body.appendChild(link);
        link.click();
    };

    const renderContent = () => {
        if (!isImage && !isPdf) {
            return <p className="content">{message}</p>;
        }
        if (isImage && !isPdf) {
            return (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <img
                    onClick={handleClick}
                    className="content"
                    src={message}
                    alt={message}
                />
            );
        }
        return (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <img width="100px" height="100px" onClick={handleClick} className="content" src={PdfIcon} alt="" />
        );
    };

    return (
        <SingleMessageStyled isCurrentUser={user.email === author}>
            <div className="header">
                <span className="author">{author}</span>
                <span className="date">{date}</span>
            </div>
            {renderContent()}
        </SingleMessageStyled>
    );
};

export default SingleMessage;
