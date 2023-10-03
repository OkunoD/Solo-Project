// import actionType constants
import * as types from '../constants/actionTypes';

export const openAlert = (message, color) => ({
  type: types.TURN_ON_ALERT,
  payload: [ message, color ]
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

export const takeOffItemActionCreator = (itemId, wornType) => ({
  type: types.TAKEOFF_ITEM,
  payload: [ itemId, wornType ],
});

export const deleteItemActionCreator = (itemTypeToDelete, itemId) => ({
  type: types.DELETE_ITEM,
  payload: [ itemTypeToDelete, itemId ],
});

export const updateItemActionCreator = (updatedItemId, itemList, updatedData) => ({
  type: types.UPDATE_ITEM,
  payload: [updatedItemId, itemList, updatedData],
});

export const sortDrawerActionCreator = (clothingType, property) => ({
  type: types.SORT_DRAWER,
  payload: [ clothingType, property ],
});

export const getFilterArraysActionCreator = (clothingType) => ({
  type: types.GET_FILTER_ARRAYS,
  payload: clothingType,
})

export const randomizeOutfitActionCreator = () => ({
  type: types.RANDOMIZE_OUTFIT,
});

export const clearOutfitActionCreator = () => ({
  type: types.CLEAR_OUTFIT,
});

export const lockItemActionCreator = (wornItemType) => ({
  type: types.LOCK_ITEM,
  payload: [ wornItemType ],
})

//not sure if need
// export const deleteOutfitActionCreator = (outfitToDelete) => ({
//   type: types.DELETE_OUTFIT,
//   payload: outfitToDelete,
// })
// add more action creators
