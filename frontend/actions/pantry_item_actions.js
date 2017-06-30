import * as APIUtil from '../util/pantry_items_api_util';

export const RECEIVE_ALL_PANTRY_ITEMS = 'RECEIVE_ALL_PANTRY_ITEMS';
export const RECEIVE_PANTRY_ITEM = 'RECEIVE_PANTRY_ITEM';
export const CREATE_PANTRY_ITEM = 'CREATE_PANTRY_ITEM';
export const UPDATE_PANTRY_ITEM = 'UPDATE_PANTRY_ITEM';
export const DELETE_PANTRY_ITEM  = 'DELETE_PANTRY_ITEM';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveAllPantryItems = (pantry_items) => ({
  type: RECEIVE_ALL_PANTRY_ITEMS,
  pantry_items
});

export const receivePantryItem = (pantry_item) => ({
  type: RECEIVE_PANTRY_ITEM,
  pantry_item
});

export const createPantryItem = (pantry_item) => ({
  type: CREATE_PANTRY_ITEM,
  pantry_item
});

export const updatePantryItem = (pantry_item) => ({
  type: UPDATE_PANTRY_ITEM,
  pantry_item
})

export const deletePantryItem = (pantry_item) => ({
  type: DELETE_PANTRY_ITEM,
  pantry_item
})

export const receivePantryErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});


export const requestAllPantryItems = () => dispatch => (
  APIUtil.fetchAllPantryItems()
    .then(pantry_items => {
    return(dispatch(receiveAllPantryItems(pantry_items)))
  }
  )
);

export const requestPantryItem = (id) => dispatch => (
  APIUtil.fetchPantryItem(id)
    .then(pantry_item => (dispatch(receivePantryItem(pantry_item)))
  )
);

export const createNewPantryItem = (pantry_item) => dispatch => {
  return APIUtil.createPantryItem(pantry_item)
    .then(pantry_item => (dispatch(createPantryItem(pantry_item))),
      err => (dispatch(receivePantryErrors(err.responseJSON)))
    )
      // let key = Object.keys(pantry_item)[0];
      // dispatch(receiveNewPantryItem(pantry_item[key]));
    // err => (dispatch(receivePantryErrors(err.responseJSON)))
  // )
};

export const editPantryItem = (pantry_item) => dispatch => (
  APIUtil.updatePantryItem(pantry_item)
    .then(pantry_item => {
      (dispatch(updatePantryItem(pantry_item)))},
    err => (dispatch(receivePantryErrors(err.responseJSON)))
  )
);

export const editPantryItemDbOnly = (pantry_item) => dispatch => {
  dispatch(updatePantryItem(pantry_item));
  return APIUtil.updatePantryItem(pantry_item);
};

export const removePantryItem = (id) => dispatch => {
  return APIUtil.deletePantryItem(id)
    .then(pantry_item => (dispatch(deletePantryItem(pantry_item)))
  )
};
