import * as APIUtil from "../util/pantry_items_api_util";

export const RECEIVE_ALL_PANTRY_ITEMS = "RECEIVE_ALL_PANTRY_ITEMS";
export const RECEIVE_PANTRY_ITEM = "RECEIVE_PANTRY_ITEM";
export const CREATE_PANTRY_ITEM = "CREATE_PANTRY_ITEM";
export const UPDATE_PANTRY_ITEM = "UPDATE_PANTRY_ITEM";
export const DELETE_PANTRY_ITEM  = "DELETE_PANTRY_ITEM";
export const RECEIVE_PANTRY_ERRORS = "RECEIVE_PANTRY_ERRORS";
export const UPDATE_QUANTITY_DISPLAY = "UPDATE_QUANTITY_DISPLAY";

const receiveAllPantryItems = (pantryItems) => ({
  type: RECEIVE_ALL_PANTRY_ITEMS,
  pantryItems
});

const receivePantryItem = (pantryItem) => ({
  type: RECEIVE_PANTRY_ITEM,
  pantryItem
});

const receiveNewPantryItem = (pantryItem) => ({
  type: CREATE_PANTRY_ITEM,
  pantryItem
});

const receiveUpdatePantryItem = (pantryItem, currentQuantityDisplay) => ({
  type: UPDATE_PANTRY_ITEM,
  pantryItem,
  currentQuantityDisplay
});

const receiveDeletePantryItem = ({pantry_item_id}) => ({
  type: DELETE_PANTRY_ITEM,
  pantryItemId: pantry_item_id
});

const receivePantryErrors = (errors) => ({
  type: RECEIVE_PANTRY_ERRORS,
  errors
});

export const updateQuantityDisplay = (id, quantityDisplay) => dispatch => {
  dispatch({
    type: UPDATE_QUANTITY_DISPLAY,
    id,
    quantityDisplay
  });
};

export const requestAllPantryItems = () => dispatch => (
  APIUtil.fetchAllPantryItems()
    .then(pantryItemsRes => {
    return(dispatch(receiveAllPantryItems(pantryItemsRes)))
  })
);

export const requestPantryItem = (id) => dispatch => (
  APIUtil.fetchPantryItem(id)
    .then(pantryItemRes => (dispatch(receivePantryItem(pantryItemRes)))
  )
);

export const createPantryItem = (pantryItem) => dispatch => {
  return APIUtil.createPantryItem(pantryItem)
    .then(pantryItemRes => (dispatch(receiveNewPantryItem(pantryItemRes))),
      err => (dispatch(receivePantryErrors(err.responseJSON)))
  )
};

export const updatePantryItem = (pantryItem) => dispatch => {
  return APIUtil.updatePantryItem(pantryItem)
    .then(pantryItemRes => {
      (dispatch(receiveUpdatePantryItem(pantryItemRes, pantryItem.pantry_item.currentQuantityDisplay)))},
    err => (dispatch(receivePantryErrors(err.responseJSON)))
  )
};

export const deletePantryItem = (id) => dispatch => {
  return APIUtil.deletePantryItem(id)
    .then(pantryIdRes => (dispatch(receiveDeletePantryItem(pantryIdRes)))
  )
};
