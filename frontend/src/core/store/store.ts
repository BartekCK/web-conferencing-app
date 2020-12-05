import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import configSlice from './slices/config.slice';
import authSlice from './slices/auth.slice';

const store = configureStore({
    reducer: {
        config: configSlice,
        auth: authSlice,
    },
    middleware: [thunk],
});

export { store };
