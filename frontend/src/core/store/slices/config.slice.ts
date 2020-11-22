import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import { IConfigSlice } from '../types';
import { LayoutType } from '../types/enum';

const initialState: IConfigSlice = {
    currentLayout: LayoutType.USER_LAYOUT,
};

const contentSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        dispatchSetCurrentLayout(state: IConfigSlice, action: PayloadAction<LayoutType>) {
            state.currentLayout = action.payload;
        },
    },
    extraReducers: {},
});

export const { dispatchSetCurrentLayout } = contentSlice.actions;

export default contentSlice.reducer;
