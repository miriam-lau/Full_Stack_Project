export const selectAllPantryItems = ({ pantry_items }) => (
  Object.keys(pantry_items).map(id => pantry_items[id])
);

export default selectAllPantryItems;
