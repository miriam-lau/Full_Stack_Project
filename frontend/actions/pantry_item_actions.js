import * as APIUtil from '../util/pantry_items_api_util';

export const RECEIVE_ALL_PANTRY_ITEMS = 'RECEIVE_ALL_PANTRY_ITEMS';
export const RECEIVE_PANTRY_ITEM = 'RECEIVE_PANTRY_ITEM';
export const CREATE_PANTRY_ITEM = 'CREATE_PANTRY_ITEM';
export const UPDATE_PANTRY_ITEM = 'UPDATE_PANTRY_ITEM';
export const DELETE_PANTRY_ITEM  = 'DELETE_PANTRY_ITEM';
export const RECEIVE_PANTRY_ERRORS = 'RECEIVE_PANTRY_ERRORS';

export const receiveAllPantryItems = (pantryItems) => ({
  type: RECEIVE_ALL_PANTRY_ITEMS,
  pantryItems
});

export const receivePantryItem = (pantryItem) => ({
  type: RECEIVE_PANTRY_ITEM,
  pantryItem
});

export const createPantryItem = (pantryItem) => ({
  type: CREATE_PANTRY_ITEM,
  pantryItem
});

export const updatePantryItem = (pantryItem) => ({
  type: UPDATE_PANTRY_ITEM,
  pantryItem
})

export const deletePantryItem = (pantryItem) => ({
  type: DELETE_PANTRY_ITEM,
  pantryItem
})

export const receivePantryErrors = (errors) => ({
  type: RECEIVE_PANTRY_ERRORS,
  errors
});


export const requestAllPantryItems = () => dispatch => (
  APIUtil.fetchAllPantryItems()
    .then(pantryItemsRes => {
    return(dispatch(receiveAllPantryItems(pantryItemsRes)))
  }
  )
);

export const requestPantryItem = (id) => dispatch => (
  APIUtil.fetchPantryItem(id)
    .then(pantryItemRes => (dispatch(receivePantryItem(pantryItemRes)))
  )
);

export const createNewPantryItem = (pantryItem) => dispatch => {
  return APIUtil.createPantryItem(pantryItem)
    .then(pantryItemRes => (dispatch(createPantryItem(pantryItemRes))),
      err => (dispatch(receivePantryErrors(err.responseJSON)))
  )
};

export const editPantryItem = (pantryItem) => dispatch => (
  APIUtil.updatePantryItem(pantryItem)
    .then(pantryItemRes => {
      (dispatch(updatePantryItem(pantryItemRes)))},
    err => (dispatch(receivePantryErrors(err.responseJSON)))
  )
);

export const removePantryItem = (id) => dispatch => {
  return APIUtil.deletePantryItem(id)
    .then(pantryItemRes => (dispatch(deletePantryItem(pantryItemRes)))
  )
};
