// TODO: rename private func to receive and public to delete, update, and create
// remove exports
import * as APIUtil from "../util/recipe_api_util";

export const RECEIVE_ALL_RECIPES = "RECEIVE_ALL_RECIPES";
export const RECEIVE_RECIPE = "RECEIVE_RECIPE";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const RECEIVE_RECIPE_ERRORS = "RECEIVE_RECIPE_ERRORS";

const receiveAllRecipes = (recipes) => ({
  type: RECEIVE_ALL_RECIPES,
  recipes
});

const receiveRecipe = (recipe) => ({
  type: RECEIVE_RECIPE,
  recipe
});

const receiveNewRecipe = (recipe) => ({
  type: CREATE_RECIPE,
  recipe
});

const receiveUpdateRecipe = (recipe) => ({
  type: UPDATE_RECIPE,
  recipe
});

const receiveDeleteRecipe = (recipe) => ({
  type: DELETE_RECIPE,
  recipe
});

const receiveRecipeErrors = (errors) => ({
  type: RECEIVE_RECIPE_ERRORS,
  errors
});

export const requestAllRecipes = () => dispatch => {
  return APIUtil.fetchAllRecipes()
    .then(recipesRes =>(dispatch(receiveAllRecipes(recipesRes)))
  )
};

export const requestRecipe = (id) => dispatch => {
  return APIUtil.fetchRecipe(id)
    .then(recipeRes => (dispatch(receiveRecipe(recipeRes)))
  )
};

export const createRecipe = (recipe) => dispatch => {
  return APIUtil.createRecipe(recipe)
    .then(recipeRes => (dispatch(receiveNewRecipe(recipeRes))),
    err => (dispatch(receiveRecipeErrors(err.responseJSON)))
  )
};

export const updateRecipe = (recipe) => dispatch => {
  console.log("in recipe actions");
  console.log(recipe);
  return APIUtil.updateRecipe(recipe)
    .then(recipeRes => (dispatch(updateRecipe(recipeRes))),
    err => (dispatch(receiveRecipeErrors(err.responseJSON)))
  )
};

export const deleteRecipe = (id) => dispatch => {
  return APIUtil.deleteRecipe(id)
    .then(recipeRes => (dispatch(receiveDeleteRecipe(recipeRes)))
  )
};
