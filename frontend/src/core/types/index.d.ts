export interface ISingleRoom {
    id: string;
    name: string;
    roomCode: string;
    roomOwner: string;
    roomMates: string[];
}

export interface IUser {
    email: string;
    password: string;
    phone?: string;
    image?: string;
}
