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
