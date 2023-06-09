// import actionType constants
import * as types from '../constants/actionTypes';

export const fetchWardrobeData = () => {
  console.log('in fetchWardrobeData')
  fetch('/api/items')
    .then(console.log('after get fetch request'))
    .then((response) => {
      console.log('response is: ', response);
      return response.json();
    })
    .then((data) => {
      console.log('data is: ', data); // Display the retrieved items in the console
      dispatchEvent({
        type: 'FETCH_MONGO_DATA_SUCCESS',
        payload: data,
      })
    })
    .catch((error) => {
      dispatchEvent({
        type: 'FETCH_MONGO_DATA_ERROR',
        payload: error.message,
      });
    });
};

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
