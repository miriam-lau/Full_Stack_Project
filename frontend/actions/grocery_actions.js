import * as APIUtil from '../util/grocery_api_util';

export const RECEIVE_ALL_GROCERY_ITEMS = 'RECEIVE_ALL_GROCERY_ITEMS';
export const RECEIVE_GROCERY_ITEM = 'RECEIVE_GROCERY_ITEM';
export const CREATE_GROCERY_ITEM = 'CREATE_GROCERY_ITEM';
export const UPDATE_GROCERY_ITEM = 'UPDATE_GROCERY_ITEM';
export const DELETE_GROCERY_ITEM  = 'DELETE_GROCERY_ITEM';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveAllGroceryItems = (grocery_items) => ({
  type: RECEIVE_ALL_GROCERY_ITEMS,
  grocery_items
});

export const receiveGroceryItem = (grocery_item) => ({
  type: RECEIVE_GROCERY_ITEM,
  grocery_item
});

export const createGroceryItem = (grocery_item) => ({
  type: CREATE_GROCERY_ITEM,
  grocery_item
});

export const updateGroceryItem = (grocery_item) => ({
  type: UPDATE_GROCERY_ITEM,
  grocery_item
})

export const deleteGroceryItem = (grocery_item) => ({
  type: DELETE_GROCERY_ITEM,
  grocery_item
})

export const receiveGroceryErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});


export const requestAllGroceryItems = () => dispatch => (
  APIUtil.fetchAllGroceryItems()
    .then(grocery_items => (dispatch(receiveAllGroceryItems(grocery_items)))
  )
);

export const requestGroceryItem = (id) => dispatch => (
  APIUtil.fetchGroceryItem(id)
    .then(grocery_item => (dispatch(receiveGroceryItem(grocery_item)))
  )
);

export const createNewGroceryItem = (grocery_item) => dispatch => (
  APIUtil.createGroceryItem(grocery_item)
    .then(grocery_item => (dispatch(createGroceryItem(grocery_item))),
    err => (dispatch(receiveGroceryErrors(err.responseJSON)))
  )
);

export const editGroceryItem = (grocery_item) => dispatch => (
  APIUtil.updateGroceryItem(grocery_item)
    .then(grocery_item => (dispatch(updateGroceryItem(grocery_item))),
    err => (dispatch(receiveGroceryErrors(err.responseJSON)))
  )
);

export const removeGroceryItem = (id) => dispatch => {
  return APIUtil.deleteGroceryItem(id)
    .then(grocery_item => (dispatch(deleteGroceryItem(grocery_item)))
  )
};
