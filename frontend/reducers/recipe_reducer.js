import merge from 'lodash/merge';
import { RECEIVE_ALL_RECIPES, RECEIVE_RECIPE, CREATE_RECIPE, UPDATE_RECIPE,
    DELETE_RECIPE, RECEIVE_RECIPE_ERRORS } from '../actions/recipe_actions';

const RecipeReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_RECIPES:
      newState = merge({}, state, action.recipes);
      return newState;
    case RECEIVE_RECIPE:
      newState = merge({}, state, action.recipe);
      return newState;
    case CREATE_RECIPE: {
      let newState = merge({}, state);
      newState[action.recipe.id] = action.recipe;
      return newState;
    }
    case UPDATE_RECIPE: {
      let newState = merge({}, state);
      newState[action.recipe.id] = action.recipe;
      return newState;
    }
    case DELETE_RECIPE: {
      let newState = merge({}, state);
      delete newState[action.recipeId];
      return newState;
    }
    case RECEIVE_RECIPE_ERRORS:
      newState = merge({}, state, action.errors);
      return newState;
    default:
      return state;
  }
};

export default RecipeReducer;
