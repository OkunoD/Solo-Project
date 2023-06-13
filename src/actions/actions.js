// import actionType constants
import * as types from '../constants/actionTypes';

export const fillWardrobeActionCreator = (data) => ({
  type: types.FETCH_MONGO_DATA_SUCCESS,
  payload: data,
  // console.log('in fillWardrobeActionCreator')
  // fetch('/api/items')
  //   .then(() => {
  //     console.log('after fillWardrobe fetch request')
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log('in fillWardrobe data is: ', data); // Display the retrieved items in the console
  //     dispatch({
  //       type: 'FETCH_MONGO_DATA_SUCCESS',
  //       payload: data,
  //     })
  //   })
  //   .catch((error) => {
  //     dispatch({
  //       type: 'FETCH_MONGO_DATA_ERROR',
  //       payload: error.message,
  //     });
  //   });
});

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
