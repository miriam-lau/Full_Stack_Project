import { combineReducers } from 'redux';
import GroceryReducer from './grocery_reducer';
import PantryItemsReducer from './pantry_items_reducer';
import RecipeReducer from './recipe_reducer';
import SearchReducer from './search_reducer';
import SessionReducer from './session_reducer';

const rootReducer = combineReducers({
  grocery: GroceryReducer,
  pantry_items: PantryItemsReducer,
  recipe: RecipeReducer,
  search: SearchReducer,
  session: SessionReducer
});

export default rootReducer;
