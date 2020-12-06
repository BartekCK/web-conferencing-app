import { axiosInstance } from 'core/api/config';
import { Routes } from 'core/api/routes';
import { IChangePassword, IUser } from 'core/types';

export const testGet = async () => {
    const res = await axiosInstance.get(Routes.testGetWithoutAuth());
    console.log(res);
};

export const testGetWithAuth = async () => {
    const res = await axiosInstance.get(Routes.testGetWithAuth());
    console.log(res);
};

export const loginFacebookPost = async (data: any) => {
    const res = await axiosInstance.post(Routes.loginFacebookPost(), data);
    return res.data;
};

export const createUserPost = async (user: IUser) => {
    const res = await axiosInstance.post(Routes.createUser(), user);
    return res.data;
};

export const loginUserPost = async (user: IUser) => {
    const res = await axiosInstance.post(Routes.login(false), user);
    return res.data;
};

export const loginUserTokenGet = async () => {
    const res = await axiosInstance.get(Routes.login(true));
    return res.data;
};

export const changePasswordPost = async (data: IChangePassword) => {
    const res = await axiosInstance.post(Routes.changePassword(), data);
    return res.data;
};

export const createRoomPost = async (roomCode: string) => {
    const res = await axiosInstance.post(Routes.room(), { roomCode });
    return res.data;
};

export const allRoomsGet = async () => {
    const res = await axiosInstance.get(Routes.room());
    return res.data;
};

export const userRoomByIdDelete = async (roomId: string) => {
    const res = await axiosInstance.delete(Routes.room(roomId));
    return res.data;
};

export const userRoomByIdGet = async (roomId: string) => {
    const res = await axiosInstance.get(Routes.room(roomId));
    return res.data;
};
