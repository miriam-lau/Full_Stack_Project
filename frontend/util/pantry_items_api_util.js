import { receiveAllPantryItems, receivePantryItem, receiveNewPantryItem,
  receiveErrors} from '../actions/pantry_item_actions';

export const fetchAllPantryItems = () => {
  return $.ajax({
    method: "GET",
    url: "/api/pantry_items"
  });
};

export const fetchPantryItem = (id) => {
  return $.ajax({
    method: "GET",
    url: `/api/pantry_items/${id}`
  });
};

export const createPantryItem = (pantry_item) => {
  return $.ajax({
    method: "POST",
    url: "api/pantry_items",
    data: pantry_item
  });
};

export const updatePantryItem = (pantry_item) => {
  console.log("in api util update");
  console.log(pantry_item);
  return $.ajax({
    method: "PATCH",
    url: `/api/pantry_items/${pantry_item.pantry_item.id}`,
    data: pantry_item
  });
}

export const deletePantryItem = (id) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/pantry_items/${id}`
  });
}
