import { receiveAllGroceryItems, receiveGroceryItem, receiveNewGroceryItem,
  receiveErrors} from '../actions/grocery_actions';

export const fetchAllGroceryItems = () => {
  return $.ajax({
    method: "GET",
    url: "/api/groceries"
  });
};

export const fetchGroceryItem = (id) => {
  return $.ajax({
    method: "GET",
    url: `/api/groceries/${id}`
  });
};

export const createGroceryItem = (grocery_item) => {
  return $.ajax({
    method: "POST",
    url: "api/groceries",
    data: grocery_item
  });
};

export const updateGroceryItem = (grocery_item) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/groceries/${grocery.grocery_item.id}`,
    data: grocery_item
  });
}

export const deleteGroceryItem = (id) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/groceries/${id}`
  });
}
