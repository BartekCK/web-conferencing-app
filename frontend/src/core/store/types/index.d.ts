import { LayoutType } from './enum';
import { IUser } from 'core/types';

export interface IConfigSlice {
    currentLayout: LayoutType;
}
export interface IAuthSlice {
    user: IUser | null;
}

export interface IStore {
    config: IConfigSlice;
    auth: IAuthSlice;
}
