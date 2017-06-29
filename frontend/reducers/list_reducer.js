import merge from 'lodash/merge';
import { RECEIVE_ALL_LISTS, RECEIVE_LIST, CREATE_LIST, UPDATE_LIST,
  DELETE_LIST, RECEIVE_ERRORS } from '../actions/list_actions';

const noErrors = Object.freeze({
  errors: []
});

const ListReducer = (state = noErrors, action) => {
  let newState;
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_LISTS:
      newState = merge({}, action.lists);
      return newState;
    case RECEIVE_LIST:
      newState = merge({}, action.list);
      return newState;
    case CREATE_LIST:
      newState = merge({}, state, {[action.list.id]: action.list});
      return newState;
    case UPDATE_LIST:
      newState = merge({}, state, {[action.list.id]: action.list});
      return newState;
    case DELETE_LIST:
      newState = merge({}, state);
      delete newState[Object.keys(action.list)[0]];
      return newState;
    case RECEIVE_ERRORS:
      newState = merge({}, state, action.errors);
      return newState;
    default:
      return state;
  }
};

export default ListReducer;
