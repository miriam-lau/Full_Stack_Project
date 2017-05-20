import merge from 'lodash/merge';
import { RECEIVE_ALL_PANTRY_ITEMS, RECEIVE_PANTRY_ITEM,
  RECEIVE_NEW_PANTRY_ITEM, UPDATE_PANTRY_ITEM, REMOVE_PANTRY_ITEM,
  RECEIVE_ERRORS } from '../actions/pantry_item_actions';

const noErrors = Object.freeze({
  errors: []
});

const PantryItemsReducer = (state = noErrors, action) => {
  Object.freeze(state)
  switch(action.type) {
    case RECEIVE_ALL_PANTRY_ITEMS:
      return action.pantry_items;
    case RECEIVE_PANTRY_ITEM:
      return action.pantry_item;
    case RECEIVE_NEW_PANTRY_ITEM:
      return merge({}, state, action.pantry_item);
    case UPDATE_PANTRY_ITEM:
      return merge({}, state, action.pantry_item);
    case REMOVE_PANTRY_ITEM:
      const newState = merge({}, state);
      delete newState[Object.keys(action.pantry_item)[0]];
      return newState;
    case RECEIVE_ERRORS:
      return merge({}, state, action.errors);
    default:
      return state;
  }
};

export default PantryItemsReducer;
