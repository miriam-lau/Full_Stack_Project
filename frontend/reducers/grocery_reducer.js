import merge from 'lodash/merge';
import { RECEIVE_ALL_GROCERY_ITEMS, RECEIVE_GROCERY_ITEM,
  CREATE_GROCERY_ITEM, UPDATE_GROCERY_ITEM, DELETE_GROCERY_ITEM,
  RECEIVE_ERRORS, UPDATE_GROCERY_QUANTITY_DISPLAY } from '../actions/grocery_actions';

const noErrors = Object.freeze({
  errors: []
});

const groceryItemWithDisplayQuantity = (groceryItem) => {
  let currentQuantityDisplay = groceryItem.quantity;
  if (groceryItem.unit != null) {
    currentQuantityDisplay += " " + groceryItem.unit;
  }
  groceryItem.currentQuantityDisplay = currentQuantityDisplay;
  return groceryItem;
}

const GroceryReducer = (state = noErrors, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ALL_GROCERY_ITEMS: {
      let newState = merge({}, state);
      Object.values(action.groceryItems).forEach(function(groceryItem) {
        newState[groceryItem.id] = groceryItemWithDisplayQuantity(groceryItem);
      });
      return newState;
    }
    case RECEIVE_GROCERY_ITEM: {
      let newState = merge({}, state);
      newState[action.groceryItem.id] =
          groceryItemWithDisplayQuantity(action.groceryItem);
      return newState;
    }
    case CREATE_GROCERY_ITEM: {
      let newState = merge({}, state);
      newState[action.groceryItem.id] =
          groceryItemWithDisplayQuantity(action.groceryItem);
      return newState;
    }
    case UPDATE_GROCERY_ITEM: {
      let newState = merge({}, state);
      action.groceryItem.currentQuantityDisplay =
          action.currentQuantityDisplay;
      newState[action.groceryItem.id] = action.groceryItem;
      return newState;
    }
    case DELETE_GROCERY_ITEM: {
      const newState = merge({}, state);
      delete newState[action.groceryItemId];
      return newState;
    }
    case RECEIVE_ERRORS:
      return merge({}, state, action.errors);
    case UPDATE_GROCERY_QUANTITY_DISPLAY: {
      let newState = merge({}, state);
      newState[action.id].currentQuantityDisplay =
          action.quantityDisplay;
      return newState;
    }
    default:
      return state;
  }
};

export default GroceryReducer;
