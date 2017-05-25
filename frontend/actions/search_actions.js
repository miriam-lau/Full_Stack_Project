import * as APIUtil from '../util/search_api_util';
export const RECEIVE_ALL_SEARCH_ITEMS = 'RECEIVE_ALL_SEARCH_ITEMS';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveAllSearchItems = (searchItems) => ({
  type: RECEIVE_ALL_SEARCH_ITEMS,
  searchItems
});

export const receiveSearchErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const requestAllSearchItems = () => dispatch => (
  APIUtil.fetchAllSearchItems(value)
    .then(searchItems => {
    return(dispatch(receiveAllSearchItems(searchItems)))
  })
);
