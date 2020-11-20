import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import configSlice from './slices/config.slice';

const store = configureStore({
    reducer: {
        config: configSlice,
    },
    middleware: [thunk],
});

export { store };
