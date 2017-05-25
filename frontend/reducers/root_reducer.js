import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import PantryItemsReducer from './pantry_items_reducer';
import GroceryReducer from './grocery_reducer';
import SearchReducer from './search_reducer';

const rootReducer = combineReducers({
  session: SessionReducer,
  pantry_items: PantryItemsReducer,
  grocery: GroceryReducer,
  search: SearchReducer
});

export default rootReducer;
