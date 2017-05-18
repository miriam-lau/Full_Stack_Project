import * as APIUtil from '../util/pantry_items_api_util';
export const RECEIVE_ALL_PANTRY_ITEMS= 'RECEIVE_ALL_PANTRY_ITEMS';
export const RECEIVE_SINGLE_PANTRY_ITEM

export const receiveAllPantryItems = () => ({
  type: RECEIVE_ALL_PANTRY_ITEMS,
  pantry_items
});

export const receiveSinglePantryItem = (pantry_item) => ({
  type: RECEIVE_SINGLE_PANTRY_ITEM,
  pantry_item
});

export const receiveNewPantryItem = (pantry_item) => ({
  type: RECEIVE_NEW_PANTRY_ITEM,
  pantry_item
});
