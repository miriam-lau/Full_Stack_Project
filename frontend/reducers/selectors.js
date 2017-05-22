export const selectAllPantryItems = ({ pantry_items }) => (
  Object.keys(pantry_items).map(id => pantry_items[id])
);

export const selectAllGroceryItems = ({ grocery_items }) => (
  Object.keys(grocery_items).map(id => grocery_items[id])
);
