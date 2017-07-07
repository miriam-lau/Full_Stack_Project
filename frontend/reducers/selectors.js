export const selectAllPantryItems = ({ pantryItems }) => (
  Object.keys(pantryItems).map(id => pantryItems[id])
);

export const selectAllGroceryItems = ({ grocery }) => (
  Object.keys(grocery).map(id => grocery[id])
);

export const selectAllRecipes = ({ recipe }) => (
  Object.keys(recipe).map(id => recipe[id])
);

export const selectAllReminders = ({ reminder }) => (
  Object.keys(reminder).map(id => reminder[id])
);
