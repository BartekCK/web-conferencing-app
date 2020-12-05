export interface IUserFacebookDTO {
    id: string;
    first_name: string;
    last_name: string;
    name: string;
    name_format: string;
    picture: any;
    short_name: string;
    email: string;
}

export interface IChangePasswordDTO {
    newPassword: string;
    currentPassword: string;
}

export interface IUserDTO {
    id: string;
    email: string;
    image?: string;
    phone?: string;
}

export interface IUserCreateDTO {
    id: string;
    email: string;
    password: string;
    phone?: string;
}

export interface IRoomCreateDTO {
    roomCode: string;
    owner: string;
}

export interface IRoomDTO {
    roomName?: string;
    roomCode: string;
    owner: IUserDTO;
    guests: IUserDTO[];
}

export interface ILoginDTO {
    email: string;
    password: string;
}
