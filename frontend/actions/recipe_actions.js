import * as APIUtil from '../util/recipe_api_util';

export const RECEIVE_ALL_RECIPES = 'RECEIVE_ALL_RECIPES';
export const RECEIVE_RECIPE = 'RECEIVE_RECIPE';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveAllRecipes = (recipes) => ({
  type: RECEIVE_ALL_RECIPES,
  recipes
});

export const receiveRecipe = (recipe) => ({
  type: RECEIVE_RECIPE,
  recipe
});

export const createRecipe = (recipe) => ({
  type: CREATE_RECIPE,
  recipe
});

export const updateRecipe = (recipe) => ({
  type: UPDATE_RECIPE,
  recipe
});

export const deleteRecipe = (recipe) => ({
  type: DELETE_RECIPE,
  recipe
});

export const receiveRecipeErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const requestAllRecipes = () => dispatch => {
  return APIUtil.fetchAllRecipes()
    .then(recipes =>(dispatch(receiveAllRecipes(recipes)))
  )
};

export const requestRecipe = (id) => dispatch => {
  return APIUtil.fetchRecipe(id)
    .then(recipe => (dispatch(receiveRecipe(recipe)))
  )
};

export const createNewRecipe = (recipe) => dispatch => {
  return APIUtil.createRecipe(recipe)
    .then(recipe => (dispatch(createRecipe(recipe))),
    err => (dispatch(receiveRecipeErrors(err.responseJSON)))
  )
};

export const editRecipe = (recipe) => dispatch => {
  return APIUtil.updateRecipe(recipe)
    .then(recipe => (dispatch(updateRecipe(recipe))),
    err => (dispatch(receiveRecipeErrors(err.responseJSON)))
  )
};

export const removeRecipe = (id) => dispatch => {
  return APIUtil.deleteRecipe(id)
    .then(recipe => (dispatch(deleteRecipe(recipe)))
  )
};
