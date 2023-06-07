// import actionType constants
import * as types from '../constants/actionTypes';

export const addItemActionCreator = (itemType, name, imgUrl, color) => ({
  type: types.ADD_ITEM,
  payload1: itemType,
  payload2: name,
  payload3: imgUrl,
  payload4: color,
});

export const tryOnItemActionCreator =  (itemType, itemId, wornType) => ({
  type: types.TRYON_ITEM,
  payload: [ itemType, itemId, wornType ],
});

export const deleteItemActionCreator = (itemTypeToDelete, itemId) => ({
  type: types.DELETE_ITEM,
  payload: [ itemTypeToDelete, itemId ],
});

// add more action creators
