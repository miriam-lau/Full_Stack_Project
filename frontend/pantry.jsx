import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

function displayStateChange() {
  console.log("State changed");
  console.log(JSON.stringify(window.store.getState()));
}

document.addEventListener('DOMContentLoaded', () => {
    let store;
    if (window.currentUser) {
      const preloadedState = {session: {currentUser: window.currentUser, errors: [] }};
      store = configureStore(preloadedState);
      delete window.currentUser;
    } else {
      store = configureStore();
    }
    window.store = store;

    store.subscribe(displayStateChange);

    const root = document.getElementById('root');
    ReactDOM.render(<Root store={ store } />, root);
});
