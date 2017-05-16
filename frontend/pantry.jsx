import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

import { signup, signin, signout } from './util/session_api_util';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    let store = configureStore();

    window.store = store;
    window.signup = signup;
    window.signin = signin;
    window.signout = signout;

    ReactDOM.render(<Root store={ store } />, root);
});
