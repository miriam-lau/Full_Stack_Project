
export const fetchAllPantryItems = () => {
  return $.ajax({
    method: "GET",
    url: "/api/pantry_items"
  });
};

export const fetchSinglePantryItem = (id) => {
  return $.ajax({
    method: "GET",
    url: `/api/pantry_items/${id}`
  });
};

export const createPantryItem = (pantry_item) => {
  return $.ajax({
    method: "POST",
    url: "api/pantry_items"
    data: pantry_item
  });
}
