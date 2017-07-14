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
  console.log("in recipe api");
  console.log(recipe.recipe.id);
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
