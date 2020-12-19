import Peer from 'peerjs';

export interface ISingleRoom {
    id: string;
    roomCode: string;
    roomName?: string;
    owner: string;
    guests?: (string | IUser)[];
}

export interface IUser {
    id?: string;
    _id?: string;
    email: string;
    password: string;
    phone?: string;
    image?: string;
}

export interface IChangePassword {
    currentPassword: string;
    newPassword: string;
}

export interface IMessage {
    message: string;
    author: string;
    date: string;
    resultPath?: string;
    isImage: boolean;
    isPdf: boolean;
}

export interface IUserList {
    email: string;
    socketId: string;
    userId: string;
    userImage?: string;
    _id: string;
}

export interface IGuestStream {
    stream: MediaStream;
    userCall: Peer.MediaConnection;
}
