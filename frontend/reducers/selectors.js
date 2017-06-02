export const selectAllPantryItems = ({ pantry_items }) => (
  Object.keys(pantry_items).map(id => pantry_items[id])
);

export const selectAllGroceryItems = ({ grocery }) => (
  Object.keys(grocery).map(id => grocery[id])
);

export const selectAllRecipes = ({ recipes }) => (
  Object.keys(recipes).map(id => recipes[id])
);
