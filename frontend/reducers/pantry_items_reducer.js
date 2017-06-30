import merge from 'lodash/merge';
import { RECEIVE_ALL_PANTRY_ITEMS, RECEIVE_PANTRY_ITEM,
  CREATE_PANTRY_ITEM, UPDATE_PANTRY_ITEM, DELETE_PANTRY_ITEM,
  RECEIVE_ERRORS } from '../actions/pantry_item_actions';

const noErrors = Object.freeze({
  errors: []
});

const PantryItemsReducer = (state = noErrors, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ALL_PANTRY_ITEMS:
      return action.pantry_items;
    case RECEIVE_PANTRY_ITEM:
      return action.pantry_item;
    case CREATE_PANTRY_ITEM:
      return merge({}, state, action.pantry_item);
    case UPDATE_PANTRY_ITEM:
      return merge({}, state, action.pantry_item);
    case DELETE_PANTRY_ITEM:
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


// const PantryItemsReducer = (state = noErrors, action) => {
//   Object.freeze(state)
//   switch(action.type) {
//     case RECEIVE_ALL_PANTRY_ITEMS:
//       let pantry_items = action.pantry_items;
//       for (let key in pantry_items) {
//         if (pantry_items.hasOwnProperty(key)) {
//           pantry_items[key].unparsed_quantity = pantry_items[key].quantity + (pantry_items[key].unit != '' ? (' ' + pantry_items[key].unit) : '');
//         }
//       }
//       return pantry_items;
//     case RECEIVE_PANTRY_ITEM:
//       let pantry_item = action.pantry_item;
//       pantry_item.unparsed_quantity = pantry_item.quantity + (pantry_item.unit != '' ? (' ' + pantry_item.unit) : '');
//       return pantry_item;
//     case CREATE_PANTRY_ITEM:
//       let newState = merge({}, state, {[action.pantry_item.id: action.pantry_item]});
//       return newState;
//
//       // let new_pantry_item = action.pantry_item;
//       // new_pantry_item.unparsed_quantity = new_pantry_item.quantity + (new_pantry_item.unit != '' ? (' ' + new_pantry_item.unit) : '');
//       // let newPantryState = merge({}, state);
//       // newPantryState[action.pantry_item.id] = new_pantry_item;
//       // return newPantryState;
//     case UPDATE_PANTRY_ITEM:
//       let newUpdateState =  merge({}, state);
//       newUpdateState[action.pantry_item.pantry_item.id] = action.pantry_item.pantry_item;
//       return newUpdateState;
//     case DELETE_PANTRY_ITEM:
//       const newState = merge({}, state);
//       delete newState[Object.keys(action.pantry_item)[0]];
//       return newState;
//     case RECEIVE_ERRORS:
//       return merge({}, state, action.errors);
//     default:
//       return state;
//   }
// };
