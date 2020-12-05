import { axiosInstance } from 'core/api/config';
import { Routes } from 'core/api/routes';
import { IUser } from 'core/types';

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
