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
      id: '',
      type: '',
      name: '',
      imgUrl: '',
      color: '',
    },

    topsList: [],
    lastTopsId: 0,
    wornTop: { 
      id: '',
      type: '',
      name: '',
      imgUrl: '',
      color: '',
    },

    jacketsList: [],
    lastJacketsId: 0,
    wornJacket: { 
      id: '',
      type: '',
      name: '',
      imgUrl: '',
      color: '',
    },

    bottomsList: [],
    lastBottomsId: 0,
    wornBottom: { 
      id: '',
      type: '',
      name: '',
      imgUrl: '',
      color: '',
    },

    shoesList: [],
    lastShoesId: 0,
    wornShoes: { 
      id: '',
      type: '',
      name: '',
      imgUrl: '',
      color: '',
    },

    accessoriesList: [],
    lastAccessoriesId: 0,
    wornAccessory: { 
      id: '',
      type: '',
      name: '',
      imgUrl: '',
      color: '',
    },
}

// put the post/fetch inside the frontend in same action 

const wardrobeReducer = (state = initialState, action) => {
  const fillWardrobe = (payload) => {
    const headwear = []
    const tops = [];
    const jackets = [];
    const bottoms = [];
    const shoes = [];
    const accessories = [];

    console.log('fillWardrobe payload is: ', payload); //should be an array of objects [{type: 'headwear'}, {type: 'headwear'}, etc]
    for (let i = 0; i < payload.length; i++) {
      if (payload[i].type === 'headwear') {
        headwear.push(payload[i]); 
      } else if (payload[i].type === 'tops') {
        tops.push(payload[i]); 
      } else if (payload[i].type === 'jackets') {
        jackets.push(payload[i]); 
      } else if (payload[i].type === 'bottoms') {
        bottoms.push(payload[i]); 
      } else if (payload[i].type === 'shoes') {
        shoes.push(payload[i]); 
      } else if (payload[i].type === 'accessories') {
        accessories.push(payload[i]); 
      };
    };
    return {
      ...state,
      headwearList: headwear,
      topsList: tops,
      jacketsList: jackets,
      bottomsList: bottoms,
      shoesList: shoes,
      accessoriesList: accessories,
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
    case types.FETCH_MONGO_DATA_SUCCESS:
      return fillWardrobe(action.payload);//

    case types.FETCH_MONGO_DATA_ERROR:
      return

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