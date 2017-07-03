import merge from 'lodash/merge';
import { RECEIVE_ALL_PANTRY_ITEMS, RECEIVE_PANTRY_ITEM,
  CREATE_PANTRY_ITEM, UPDATE_PANTRY_ITEM, DELETE_PANTRY_ITEM,
  RECEIVE_PANTRY_ERRORS } from '../actions/pantry_item_actions';

const noErrors = Object.freeze({
  errors: []
});

const pantryItemWithDisplayQuantity = (pantryItem) => {

}

const PantryItemsReducer = (state = noErrors, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ALL_PANTRY_ITEMS:
      return action.pantryItems;
    case RECEIVE_PANTRY_ITEM:
      return action.pantryItem;
    case CREATE_PANTRY_ITEM:
      return merge({}, state, action.pantryItem);
    case UPDATE_PANTRY_ITEM:
      return merge({}, state, action.pantryItem);
    case DELETE_PANTRY_ITEM:
      const newState = merge({}, state);
      delete newState[Object.keys(action.pantryItem)[0]];
      return newState;
    case RECEIVE_PANTRY_ERRORS:
      return merge({}, state, action.errors);
    default:
      return state;
  }
};

export default PantryItemsReducer;
