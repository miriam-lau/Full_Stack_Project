import merge from 'lodash/merge';
import { RECEIVE_ALL_GROCERY_ITEMS, RECEIVE_GROCERY_ITEM,
  CREATE_GROCERY_ITEM, UPDATE_GROCERY_ITEM, DELETE_GROCERY_ITEM,
  RECEIVE_ERRORS } from '../actions/grocery_actions';

const noErrors = Object.freeze({
  errors: []
});

const GroceryReducer = (state = noErrors, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ALL_GROCERY_ITEMS:
      return action.groceryItems;
    case RECEIVE_GROCERY_ITEM:
      return action.groceryItem;
    case CREATE_GROCERY_ITEM:
      return merge({}, state, action.groceryItem);
    case UPDATE_GROCERY_ITEM:
      return merge({}, state, action.groceryItem);
    case DELETE_GROCERY_ITEM:
      const newState = merge({}, state);
      delete newState[Object.keys(action.groceryItem)[0]];
      return newState;
    case RECEIVE_ERRORS:
      return merge({}, state, action.errors);
    default:
      return state;
  }
};

export default GroceryReducer;
