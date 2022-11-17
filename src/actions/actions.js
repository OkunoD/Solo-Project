// import actionType constants
import * as types from '../constants/actionTypes';

//WARDROBE ADDITION ACTIONS
export const addHeadwearActionCreator = (name, imgUrl, color) => ({
  type: types.ADD_HEADWEAR,
  payload1: name,
  payload2: imgUrl,
  payload3: color,
});
export const addTopActionCreator = (name, imgUrl, color) => ({
  type: types.ADD_TOP,
  payload1: name, 
  payload2: imgUrl,
  payload3: color,
});
export const addJacketActionCreator = (name, imgUrl, color) => ({
  type: types.ADD_JACKET,
  payload1: name, 
  payload2: imgUrl,
  payload3: color,
});
export const addBottomActionCreator = (name, imgUrl, color) => ({
  type: types.ADD_BOTTOM,
  payload1: name, 
  payload2: imgUrl,
  payload3: color,
});
export const addShoesActionCreator = (name, imgUrl, color) => ({
  type: types.ADD_SHOES,
  payload1: name, 
  payload2: imgUrl,
  payload3: color,
});
export const addAccessoriesActionCreator = (name, imgUrl, color) => ({
  type: types.ADD_ACCESSORY,
  payload1: name, 
  payload2: imgUrl,
  payload3: color,
});


//TRYON ACTIONS
export const tryOnHeadwearActionCreator = (headwearId) => ({
  type: types.TRYON_HEADWEAR,
  payload: headwearId
});
export const tryOnTopActionCreator = (topId) => ({
  type: types.TRYON_TOP,
  payload: topId
});
export const tryOnJacketActionCreator = (jacketId) => ({
  type: types.TRYON_JACKET,
  payload: jacketId
});
export const tryOnBottomActionCreator = (bottomId) => ({
  type: types.TRYON_BOTTOM,
  payload: bottomId
});
export const tryOnShoesActionCreator = (shoesId) => ({
  type: types.TRYON_SHOES,
  payload: shoesId
});
export const tryOnAccessoryActionCreator = (accessoryId) => ({
  type: types.TRYON_ACCESSORY,
  payload: accessoryId
});


// --for stretch goal--
//WARDROBE DELETION ACTIONS
export const deleteHeadwearActionCreator = headwearId => ({
  type: types.DELETE_HEADWEAR,
  payload: headwearId
});
export const deleteTopActionCreator = topId => ({
  type: types.DELETE_TOP,
  payload: topId
});
export const deleteJacketActionCreator = jacketId => ({
  type: types.DELETE_JACKET,
  payload: jacketId
});
export const deleteBottomActionCreator = bottomId => ({
  type: types.DELETE_BOTTOM,
  payload: bottomId
});
export const deleteShoesActionCreator = shoesId => ({
  type: types.DELETE_SHOES,
  payload: shoesId
});
export const deleteAccessoryActionCreator = accessoryId => ({
  type: types.DELETE_ACCESSORY,
  payload: accessoryId
});

// add more action creators
