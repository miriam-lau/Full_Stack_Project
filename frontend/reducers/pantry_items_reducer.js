import merge from 'lodash/merge';
import { RECEIVE_ALL_PANTRY_ITEMS, RECEIVE_PANTRY_ITEM,
  CREATE_PANTRY_ITEM, UPDATE_PANTRY_ITEM, DELETE_PANTRY_ITEM,
  RECEIVE_PANTRY_ERRORS } from '../actions/pantry_item_actions';

const noErrors = Object.freeze({
  errors: []
});

const pantryItemWithDisplayQuantity = (pantryItem) => {
  let currentQuantityDisplay = pantryItem.quantity;
  if (pantryItem.unit !== null) {
    currentQuantityDisplay += " " + pantryItem.unit;
  }
  pantryItem.currentQuantityDisplay = currentQuantityDisplay;
  return pantryItem;
}

const PantryItemsReducer = (state = noErrors, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ALL_PANTRY_ITEMS: {
      let newState = merge({}, state);
      Object.values(action.pantryItems).forEach(function(pantryItem) {
        newState[pantryItem.id] = pantryItemWithDisplayQuantity(pantryItem);
      });
      return newState;
    }
    case RECEIVE_PANTRY_ITEM:
      return merge({}, state, pantryItemWithDisplayQuantity(action.pantryItem));
    case CREATE_PANTRY_ITEM:
      return merge({}, state, pantryItemWithDisplayQuantity(action.pantryItem));
    case UPDATE_PANTRY_ITEM:
      return merge({}, state, pantryItemWithDisplayQuantity(action.pantryItem));
    case DELETE_PANTRY_ITEM: {
      const newState = merge({}, state);
      delete newState[action.pantryItemId];
      return newState;
    }
    case RECEIVE_PANTRY_ERRORS:
      return merge({}, state, action.errors);
    default:
      return state;
  }
};

export default PantryItemsReducer;
