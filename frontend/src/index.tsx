import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from 'App';

import 'core/styles/bootstrap.min.css';
import 'core/styles/antd.min.css';

import 'core/i18n';
import { store } from 'core/store/store';

const target = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    target,
);
