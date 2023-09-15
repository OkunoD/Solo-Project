// import actionType constants
import * as types from '../constants/actionTypes';

export const openAlert = (message) => ({
  type: types.TURN_ON_ALERT,
  payload: message,
});

export const closeAlert = () => ({
  type: types.TURN_OFF_ALERT,
});

export const fillWardrobeActionCreator = (data) => ({
  type: types.FETCH_MONGO_DATA_SUCCESS,
  payload: data,
});

export const addItemActionCreator = (itemType, name, imgUrl, color, brand, size) => ({
  type: types.ADD_ITEM,
  payload1: itemType,
  payload2: name,
  payload3: imgUrl,
  payload4: color,
  payload5: brand,
  payload6: size,
});

export const tryOnItemActionCreator =  (itemType, itemId, wornType) => ({
  type: types.TRYON_ITEM,
  payload: [ itemType, itemId, wornType ],
});

export const deleteItemActionCreator = (itemTypeToDelete, itemId) => ({
  type: types.DELETE_ITEM,
  payload: [ itemTypeToDelete, itemId ],
});

//not sure if need
// export const deleteOutfitActionCreator = (outfitToDelete) => ({
//   type: types.DELETE_OUTFIT,
//   payload: outfitToDelete,
// })
// add more action creators
