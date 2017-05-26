// import { receiveAllRecipes, receiveRecipe, receiveNewRecipe,
//   receiveErrors} from '../actions/recipe_actions';

export const fetchAllRecipes = () => {
  return $.ajax({
    method: "GET",
    url: "/api/recipes"
  });
};

export const fetchRecipe = (id) => {
  return $.ajax({
    method: "GET",
    url: `/api/recipes/${id}`
  });
};

export const createRecipe = (recipe) => {
  return $.ajax({
    method: "POST",
    url: "api/recipes",
    data: recipe
  });
};

export const updateRecipe = (recipe) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/recipes/${recipe.recipe.id}`,
    data: recipe
  });
}

export const deleteRecipe = (recipe) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/recipes/${recipe.id}`
  });
}
