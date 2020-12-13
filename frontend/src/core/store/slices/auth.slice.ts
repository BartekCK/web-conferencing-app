import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import { IAuthSlice } from '../types';
import { IUser } from 'core/types';

const initialState: IAuthSlice = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        dispatchSetCurrentUser(state: IAuthSlice, action: PayloadAction<IUser | null>) {
            state.user = action.payload;
        },
        dispatchSetCurrentUserImage(state: IAuthSlice, action: PayloadAction<string>) {
            if (!state.user) return;
            state.user.image = action.payload;
        },
    },
    extraReducers: {},
});

export const { dispatchSetCurrentUser, dispatchSetCurrentUserImage } = authSlice.actions;

export default authSlice.reducer;
