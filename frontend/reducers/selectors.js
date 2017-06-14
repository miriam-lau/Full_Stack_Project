export const selectAllPantryItems = ({ pantry_items }) => (
  Object.keys(pantry_items).map(id => pantry_items[id])
);

export const selectAllGroceryItems = ({ grocery }) => (
  Object.keys(grocery).map(id => grocery[id])
);

export const selectAllRecipes = ({ recipe }) => (
  Object.keys(recipe).map(id => recipe[id])
);
