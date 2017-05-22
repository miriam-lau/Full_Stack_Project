import { receiveAllGroceryItems, receiveGroceryItem, receiveNewGroceryItem,
  receiveErrors} from '../actions/grocery_actions';

export const fetchAllGroceryItems = () => {
  return $.ajax({
    method: "GET",
    url: "/api/grocery"
  });
};

export const fetchGroceryItem = (id) => {
  return $.ajax({
    method: "GET",
    url: `/api/grocery/${id}`
  });
};

export const createGroceryItem = (grocery_item) => {
  return $.ajax({
    method: "POST",
    url: "api/grocery",
    data: grocery_item
  });
};

export const updateGroceryItem = (grocery_item) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/grocery/${grocery.grocery_item.id}`,
    data: grocery_item
  });
}

export const deleteGroceryItem = (id) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/grocery/${id}`
  });
}
