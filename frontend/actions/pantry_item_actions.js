import * as APIUtil from '../util/pantry_items_api_util';
export const RECEIVE_ALL_PANTRY_ITEMS = 'RECEIVE_ALL_PANTRY_ITEMS';
export const RECEIVE_PANTRY_ITEM = 'RECEIVE_PANTRY_ITEM';
export const RECEIVE_NEW_PANTRY_ITEM = 'RECEIVE_NEW_PANTRY_ITEM';
export const UPDATE_PANTRY_ITEM = 'UPDATE_PANTRY_ITEM';
export const REMOVE_PANTRY_ITEM  = 'REMOVE_PANTRY_ITEM';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveAllPantryItems = (pantry_items) => ({
  type: RECEIVE_ALL_PANTRY_ITEMS,
  pantry_items
});

export const receivePantryItem = (pantry_item) => ({
  type: RECEIVE_PANTRY_ITEM,
  pantry_item
});

export const receiveNewPantryItem = (pantry_item) => ({
  type: RECEIVE_NEW_PANTRY_ITEM,
  pantry_item
});

export const updatePantryItem = (pantry_item) => ({
  type: UPDATE_PANTRY_ITEM,
  pantry_item
})

export const removePantryItem = (pantry_item) => ({
  type: REMOVE_PANTRY_ITEM,
  pantry_item
})

export const receivePantryErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});


export const requestAllPantryItems = () => dispatch => (
  APIUtil.fetchAllPantryItems()
    .then(pantry_items => (dispatch(receiveAllPantryItems(pantry_items)))
  )
);

export const requestPantryItem = (id) => dispatch => (
  APIUtil.fetchPantryItem(id)
    .then(pantry_item => (dispatch(receivePantryItem(pantry_item)))
  )
);

export const createNewPantryItem = (pantry_item) => dispatch => (
  APIUtil.createNewPantryItem(pantry_item)
    .then(pantry_item => (dispatch(receiveNewPantryItem(pantry_item))),
    err => (dispatch(receivePantryErrors(err.responseJSON)))
  )
);

export const editPantryItem = (id) => dispatch => (
  APIUtil.updatePantryItem(id)
    .then(pantry_item => (dispatch(updatePantryItem(pantry_item))),
    err => (dispatch(receivePantryErrors(err.responseJSON)))
  )
);

export const deletePantryItem = (id) => dispatch => (
  APIUtil.deletePantryItem(id)
    .then(pantry_item => (dispatch(removePantryItem(pantry_item.id)))
  )
);
