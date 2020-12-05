export interface ISingleRoom {
    id: string;
    name: string;
    roomCode: string;
    roomOwner: string;
    roomMates: string[];
}

export interface IUser {
    id?: string;
    email: string;
    password: string;
    phone?: string;
    image?: string;
}
