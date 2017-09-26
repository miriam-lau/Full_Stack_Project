import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root_reducer';

// const logger = createLogger();

let configureStore = (preloadedState = {}) => (
  createStore(rootReducer, preloadedState, applyMiddleware(thunk))
  // createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger))
);

export default configureStore;
