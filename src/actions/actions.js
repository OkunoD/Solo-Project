// import actionType constants
import * as types from '../constants/actionTypes';

export const addCardActionCreator = marketId => ({
  type: types.ADD_CARD,
  payload: marketId,
});

export const addMarketActionCreator = () => {
  return {
  type: types.ADD_MARKET,
  }
};

export const setNewLocationActionCreator = newLocation => ({
  type: types.SET_NEW_LOCATION,
  payload: newLocation
});

export const deleteCardActionCreator = marketId => ({
  type: types.DELETE_CARD,
  payload: marketId
});

/*
//WARDROBE ADDITION ACTIONS
export const addHeadwearActionCreator = (headwearName, imgUrl) => ({
  type: types.ADD_HEADWEAR,
  payload: headwearName, imgUrl
});
export const addTopCreator = (topName, imgUrl) => ({
  type: types.ADD_TOP,
  payload: topName, imgUrl
});
export const addJacketCreator = (jacketName, imgUrl) => ({
  type: types.ADD_JACKET,
  payload: jacketName, imgUrl
});
export const addBottomCreator = (bottomName, imgUrl) => ({
  type: types.ADD_BOTTOM,
  payload: bottomName, imgUrl
});
export const addShoesCreator = (shoesName, imgUrl) => ({
  type: types.ADD_SHOES,
  payload: shoesName, imgUrl
});
export const addAccessoriesCreator = (accessoryName, imgUrl) => ({
  type: types.ADD_ACCESSORY,
  payload: accessoryName, imgUrl
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


/* --for stretch goal--
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
*/