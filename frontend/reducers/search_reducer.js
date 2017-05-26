import merge from 'lodash/merge';
import { RECEIVE_ALL_SEARCH_ITEMS, RECEIVE_ERRORS } from '../actions/search_actions';

const noSearchItems = Object.freeze({
  searchItems: [],
  errors: []
});

const SearchReducer = (state = noSearchItems, action) => {
  Object.freeze(state)
  switch(action.type) {
    case RECEIVE_ALL_SEARCH_ITEMS:
      return merge({}, noSearchItems, {searchItems: action.searchItems});
    case RECEIVE_ERRORS:
      return merge({}, state, action.errors);
    default:
      return state;
  }
};

export default SearchReducer;
