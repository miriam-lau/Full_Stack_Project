import { combineReducers } from 'redux';
import GroceryReducer from './grocery_reducer';
import PantryItemsReducer from './pantry_items_reducer';
import RecipeReducer from './recipe_reducer';
import ReminderReducer from './reminder_reducer';
import SearchReducer from './search_reducer';
import SessionReducer from './session_reducer';

const rootReducer = combineReducers({
  grocery: GroceryReducer,
  pantryItems: PantryItemsReducer,
  recipe: RecipeReducer,
  reminder: ReminderReducer,
  search: SearchReducer,
  session: SessionReducer
});

export default rootReducer;
