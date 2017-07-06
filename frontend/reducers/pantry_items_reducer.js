import merge from "lodash/merge";
import { RECEIVE_ALL_PANTRY_ITEMS, RECEIVE_PANTRY_ITEM, CREATE_PANTRY_ITEM,
    UPDATE_PANTRY_ITEM, DELETE_PANTRY_ITEM, RECEIVE_PANTRY_ERRORS, UPDATE_QUANTITY_DISPLAY } from "../actions/pantry_item_actions";
// import generateDisplayQuantity from "../components/utils/item_helpers";

const noErrors = Object.freeze({
  errors: []
});

const pantryItemWithDisplayQuantity = (pantryItem) => {
  let currentQuantityDisplay = pantryItem.quantity;
  if (pantryItem.unit != null) {
    currentQuantityDisplay += " " + pantryItem.unit;
  }
  pantryItem.currentQuantityDisplay = currentQuantityDisplay;
  // pantryItem.currentQuantityDisplay = generateDisplayQuantity(pantryItem);
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
    case RECEIVE_PANTRY_ITEM: {
      let newState = merge({}, state);
      newState[action.pantryItem.id] =
          pantryItemWithDisplayQuantity(action.pantryItem);
      return newState;
    }
    case CREATE_PANTRY_ITEM: {
      let newState = merge({}, state);
      newState[action.pantryItem.id] =
          pantryItemWithDisplayQuantity(action.pantryItem);
      return newState;
    }
    case UPDATE_PANTRY_ITEM: {
      let newState = merge({}, state);
      action.pantryItem.currentQuantityDisplay =
          action.currentQuantityDisplay;
      newState[action.pantryItem.id] = action.pantryItem;
      return newState;
    }
    case DELETE_PANTRY_ITEM: {
      const newState = merge({}, state);
      delete newState[action.pantryItemId];
      return newState;
    }
    case RECEIVE_PANTRY_ERRORS:
      return merge({}, state, action.errors);
    case UPDATE_QUANTITY_DISPLAY: {
      let newState = merge({}, state);
      newState[action.id].currentQuantityDisplay =
          action.quantityDisplay;
      return newState;
    }
    default:
      return state;
  }
};

export default PantryItemsReducer;
