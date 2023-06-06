import * as types from '../constants/actionTypes';

const initialState = {
    totalHeadwear: 0,
    totalTops: 0,
    totalJackets: 0,
    totalBottoms: 0,
    totalShoes: 0,
    totalAccessories: 0,

    headwearList: [],
    lastHeadwearId: 0,
    selectedHeadwear: {},

    topsList: [],
    lastTopsId: 0,
    selectedTop: {},

    jacketsList: [],
    lastJacketsId: 0,
    selectedJacket: {},

    bottomsList: [],
    lastBottomsId: 0,
    selectedBottom: {},

    shoesList: [],
    lastShoesId: 0,
    selectedShoes: {},

    accessoriesList: [],
    lastAccessoriesId: 0,
    selectedAccessory: {}
}

// put the post/fetch inside the frontend in same action 

const wardrobeReducer = (state = initialState, action) => {
  let headwearList;
  let topsList;
  let jacketsList;
  let bottomsList;
  let shoesList;
  let accessoriesList;

  const deleteItem = (listName, itemId) => {
    const updatedList = state[listName].filter(item => item.id !== itemId);
    return {
      ...state,
      [listName]: updatedList,
    };
  };
  const tryOnItem = (listName, itemId, selectedType) => {
    const wornItem = state[listName].find(item => item.id === itemId)
    return {
      ...state,
      [selectedType]: wornItem,
    }
  }

  const addItem = (...payload) => {
    console.log('payload is :', payload);
    const itemType = payload[0];
    const listName = `${itemType}List`;
    const lastItemIdString = `last${itemType.charAt(0).toUpperCase()}${itemType.slice(1)}Id`;
    const totalItemIdString = `total${itemType.charAt(0).toUpperCase()}${itemType.slice(1)}`;

    const lastItemId = state[lastItemIdString];
    const updatedList = [...state[listName]];
    const newItemId = lastItemId + 1;

    const newItem = {
      id: newItemId,
      name: payload[1],
      imgUrl: payload[2],
      color: payload[3],
    };

    console.log(newItem);
    updatedList.push(newItem);

    return {
      ...state,
      [listName]: updatedList,
      [totalItemIdString]: state[totalItemIdString] + 1,
      [lastItemIdString]: newItemId,
    };
  };

  switch (action.type) {
    case types.ADD_ITEM:
      return addItem(action.payload1, action.payload2, action.payload3, action.payload4);
    //BELOW TO REFACTOR/MAKE GENERAL ACTIONS FOR TRY ON AND DELETE
    // case types.TRYON_ITEM:
    //   return tryOnItem(action.payload1, action.payload2, action.payload3, action.payload4);
    
    // case types.DELETE_ITEM:
    //   return deleteItem('accessoriesList', action.payload);

    case types.TRYON_HEADWEAR:
      return tryOnItem('headwearList', action.payload, 'selectedHeadwear');
      
    case types.TRYON_TOP:
      return tryOnItem('topsList', action.payload, 'selectedTop');

    case types.TRYON_JACKET:
      return tryOnItem('jacketsList', action.payload, 'selectedJacket');

    case types.TRYON_BOTTOM:
      return tryOnItem('bottomsList', action.payload, 'selectedBottom');

    case types.TRYON_SHOES:
      return tryOnItem('shoesList', action.payload, 'selectedShoes');

    case types.TRYON_ACCESSORY:
      return tryOnItem('accessoriesList', action.payload, 'selectedAccessory');

    case types.DELETE_HEADWEAR:
      return deleteItem('headwearList', action.payload);

    case types.DELETE_TOP:
      return deleteItem('topsList', action.payload);

    case types.DELETE_JACKET:
      return deleteItem('jacketsList', action.payload);

    case types.DELETE_BOTTOM:
      return deleteItem('bottomsList', action.payload);

    case types.DELETE_SHOES:
      return deleteItem('shoesList', action.payload);

    case types.DELETE_ACCESSORY:
      return deleteItem('accessoriesList', action.payload);

    default: {
      return state;
    };
  };
};

export default wardrobeReducer;