import * as APIUtil from "../util/list_api_util";

export const RECEIVE_ALL_LISTS = "RECEIVE_ALL_LISTS";
export const RECEIVE_LIST = "RECEIVE_LIST";
export const CREATE_LIST = "CREATE_LIST";
export const UPDATE_LIST = "UPDATE_LIST";
export const DELETE_LIST = "DELETE_LIST";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

const receiveAllLists = (lists) => ({
  type: RECEIVE_ALL_LISTS,
  lists
});

const receiveList = (list) => ({
  type: RECEIVE_LIST,
  list
});

const receiveNewList = (list) => ({
  type: CREATE_LIST,
  list
});

const receiveUpdateList = (list) => ({
  type: UPDATE_LIST,
  list
})

const receiveDeleteList = (list) => ({
  type: DELETE_LIST,
  list
})

const receiveListErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const requestAllLists = () => dispatch => {
  return APIUtil.fetchAllLists()
    .then(listsRes =>(dispatch(receiveAllLists(listsRes)))
  )
};

export const requestList = (id) => dispatch => {
  return APIUtil.fetchList(id)
    .then(listRes => (dispatch(receiveList(listRes)))
  )
};

export const createList = (list) => dispatch => {
  return APIUtil.createList(list)
    .then(listRes => (dispatch(receiveNewList(listRes))),
    err => (dispatch(receiveListErrors(err.responseJSON)))
  )
};

export const updateList = (list) => dispatch => {
  return APIUtil.updateList(list)
    .then(listRes => (dispatch(receiveUpdateList(listRes))),
    err => (dispatch(receiveListErrors(err.responseJSON)))
  )
};

export const deleteList = (id) => dispatch => {
  return APIUtil.deleteList(id)
    .then(listRes => (dispatch(receiveDeleteList(listRes)))
  )
};
