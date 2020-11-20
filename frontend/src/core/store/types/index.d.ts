import { LayoutType } from './enum';

export interface IConfigSlice {
    currentLayout: LayoutType;
}

export interface IStore {
    config: IConfigSlice
}
