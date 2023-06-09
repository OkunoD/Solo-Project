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
    wornHeadwear: { 
      id: 'none',
      type: 'none',
      name: 'headwearname',
      imgUrl: 'none',
      color: 'none',
    },

    topsList: [],
    lastTopsId: 0,
    wornTop: { 
      id: 'none',
      type: 'none',
      name: 'topsname',
      imgUrl: 'none',
      color: 'none',
    },

    jacketsList: [],
    lastJacketsId: 0,
    wornJacket: { 
      id: 'none',
      type: 'none',
      name: 'none',
      imgUrl: 'none',
      color: 'none',
    },

    bottomsList: [],
    lastBottomsId: 0,
    wornBottom: { 
      id: 'none',
      type: 'none',
      name: 'none',
      imgUrl: 'none',
      color: 'none',
    },

    shoesList: [],
    lastShoesId: 0,
    wornShoes: { 
      id: 'none',
      type: 'none',
      name: 'none',
      imgUrl: 'none',
      color: 'none',
    },

    accessoriesList: [],
    lastAccessoriesId: 0,
    wornAccessory: { 
      id: 'none',
      type: 'none',
      name: 'none',
      imgUrl: 'none',
      color: 'none',
    },
}

// put the post/fetch inside the frontend in same action 

const wardrobeReducer = (state = initialState, action) => {

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
      type: payload[0],
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

  const tryOnItem = (listName, itemId, wornType) => {
    const wornItem = state[listName].find(item => item.id === itemId)
    return {
      ...state,
      [wornType]: wornItem,
    };
  };

  const deleteItem = (listName, itemId) => {
    const updatedList = state[listName].filter(item => item.id !== itemId);
    return {
      ...state,
      [listName]: updatedList,
    };
  };

  switch (action.type) {
    case types.ADD_ITEM:
      return addItem(action.payload1, action.payload2, action.payload3, action.payload4);

    case types.TRYON_ITEM:
      const [ itemType, itemId, wornType ] = action.payload;
      console.log('action payload is: ', action.payload);
      console.log('in reducer, itemType is: ', itemType);
      return tryOnItem(`${itemType}List`, itemId, `worn${wornType}`);

    case types.DELETE_ITEM:
      const [ itemTypeToDelete, itemIdToDelete ] = action.payload;
      console.log('in reducer, itemTypeToDelete is: ', itemTypeToDelete);
      console.log('in DELETE_ITEM reducer', {itemIdToDelete});
      return deleteItem(`${itemTypeToDelete}List`, itemIdToDelete);

    default: {
      return state;
    };
  };
};

export default wardrobeReducer;