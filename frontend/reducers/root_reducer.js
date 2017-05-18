import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import PantryItemsReducer from './pantry_items_reducer';

const rootReducer = combineReducers({
  session: SessionReducer
});

export default rootReducer;
