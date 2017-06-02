import merge from 'lodash/merge';
import { RECEIVE_ALL_RECIPES, RECEIVE_RECIPE, CREATE_RECIPE, UPDATE_RECIPE,
  DELETE_RECIPE, RECEIVE_ERRORS } from '../actions/recipe_actions';

const noErrors = Object.freeze({
  errors: []
});

const RecipeReducer = (state = noErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_RECIPES:
      let newState = merge({}, action.recipes);
      return newState;
    case RECEIVE_RECIPE:
      let newState = merge({}, action.recipe);
      return newState;
    case CREATE_RECIPE:
      let newState = merge({}, state, {[action.recipe.id]: action.recipe});
      return newState;
    case UPDATE_RECIPE:
      let newState = merge({}, state, {[action.recipe.id] = action.recipe});
      return newState;
    case DELETE_RECIPE:
      let newState = merge({}, state);
      delete newState[Object.keys(action.recipe)[0]];
      return newState;
    case RECEIVE_ERRORS:
      let newState = merge({}, state, action.errors);
      return newState;
    default:
      return state;
  }
};

export default RecipeReducer;
