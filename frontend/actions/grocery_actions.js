import * as APIUtil from "../util/grocery_api_util";

export const RECEIVE_ALL_GROCERY_ITEMS = "RECEIVE_ALL_GROCERY_ITEMS";
export const RECEIVE_GROCERY_ITEM = "RECEIVE_GROCERY_ITEM";
export const CREATE_GROCERY_ITEM = "CREATE_GROCERY_ITEM";
export const UPDATE_GROCERY_ITEM = "UPDATE_GROCERY_ITEM";
export const DELETE_GROCERY_ITEM  = "DELETE_GROCERY_ITEM";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const UPDATE_GROCERY_QUANTITY_DISPLAY = "UPDATE_GROCERY_QUANTITY_DISPLAY";

const receiveAllGroceryItems = (groceryItems) => ({
  type: RECEIVE_ALL_GROCERY_ITEMS,
  groceryItems
});

const receiveGroceryItem = (groceryItem) => ({
  type: RECEIVE_GROCERY_ITEM,
  groceryItem
});

const receiveNewGroceryItem = (groceryItem) => ({
  type: CREATE_GROCERY_ITEM,
  groceryItem
});

const receiveUpdateGroceryItem = (groceryItem, currentQuantityDisplay) => ({
  type: UPDATE_GROCERY_ITEM,
  groceryItem,
  currentQuantityDisplay
});

const receiveDeleteGroceryItem = ({grocery_item_id}) => ({
  type: DELETE_GROCERY_ITEM,
  groceryItemId: grocery_item_id
});

const receiveGroceryErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const updateGroceryQuantityDisplay = (id, quantityDisplay) => dispatch => {
  dispatch({
    type: UPDATE_GROCERY_QUANTITY_DISPLAY,
    id,
    quantityDisplay
  });
};

export const requestAllGroceryItems = () => dispatch => (
  APIUtil.fetchAllGroceryItems()
    .then(groceryItemsRes => (dispatch(receiveAllGroceryItems(groceryItemsRes)))
  )
);

export const requestGroceryItem = (id) => dispatch => (
  APIUtil.fetchGroceryItem(id)
    .then(groceryItemRes => (dispatch(receiveGroceryItem(groceryItemRes)))
  )
);

export const createGroceryItem = (groceryItem) => dispatch => (
  APIUtil.createGroceryItem(groceryItem)
    .then(groceryItemRes => (dispatch(receiveNewGroceryItem(groceryItemRes))),
    err => (dispatch(receiveGroceryErrors(err.responseJSON)))
  )
);

export const updateGroceryItem = (groceryItem) => dispatch => {
  return APIUtil.updateGroceryItem(groceryItem)
    .then(groceryItemRes => {
      (dispatch(receiveUpdateGroceryItem(groceryItemRes,
      groceryItem.grocery_item.currentQuantityDisplay)))},
    err => (dispatch(receiveGroceryErrors(err.responseJSON)))
  )
};

export const deleteGroceryItem = (id) => dispatch => {
  return APIUtil.deleteGroceryItem(id)
    .then(groceryIdRes => (dispatch(receiveDeleteGroceryItem(groceryIdRes)))
  )
};
