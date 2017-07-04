// TODO: rename private func to receive and public to delete, update, and create
// remove exports
import * as APIUtil from "../util/list_api_util";

export const RECEIVE_ALL_LISTS = "RECEIVE_ALL_LISTS";
export const RECEIVE_LIST = "RECEIVE_LIST";
export const CREATE_LIST = "CREATE_LIST";
export const UPDATE_LIST = "UPDATE_LIST";
export const DELETE_LIST = "DELETE_LIST";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

export const receiveAllLists = (lists) => ({
  type: RECEIVE_ALL_LISTS,
  lists
});

export const receiveList = (list) => ({
  type: RECEIVE_LIST,
  list
});

export const createList = (list) => ({
  type: CREATE_LIST,
  list
});

export const updateList = (list) => ({
  type: UPDATE_LIST,
  list
})

export const deleteList = (list) => ({
  type: DELETE_LIST,
  list
})

export const receiveListErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const requestAllLists = () => dispatch => {
  return APIUtil.fetchAllLists()
    .then(lists =>(dispatch(receiveAllLists(lists)))
  )
};

export const requestList = (id) => dispatch => {
  return APIUtil.fetchList(id)
    .then(list => (dispatch(receiveList(list)))
  )
};

export const createNewList = (list) => dispatch => {
  return APIUtil.createList(list)
    .then(list => (dispatch(createList(list))),
    err => (dispatch(receiveListErrors(err.responseJSON)))
  )
};

export const editList = (list) => dispatch => {
  return APIUtil.updateList(list)
    .then(list => (dispatch(updateList(list))),
    err => (dispatch(receiveListErrors(err.responseJSON)))
  )
};

export const removeList = (id) => dispatch => {
  return APIUtil.deleteList(id)
    .then(list => (dispatch(deleteList(list)))
  )
};
