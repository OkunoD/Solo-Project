import * as types from '../constants/actionTypes';

const initialState = {
  isAlertOn: false,
  message: '',
  refresh: false,
  lastItemId: 0,
  
  headwearList: [],
  wornHeadwear: [],
  
  topsList: [],
  wornTops: [],
  
  jacketsList: [],
  wornJackets: [],
  
  bottomsList: [],
  wornBottoms: [],
  
  shoesList: [],
  wornShoes: [],
  
  accessoriesList: [],
  wornAccessories: [],
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

    // console.log('fillWardrobe payload is: ', payload); //should be an array of objects [{type: 'headwear'}, {type: 'headwear'}, etc]
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
    
    // console.log('fillWardrobe payload[payload.length-1].id is: ', payload[payload.length-1].id)
    
    return {
      ...state,
      lastItemId: payload[payload.length-1].id,
      headwearList: headwear,
      topsList: tops,
      jacketsList: jackets,
      bottomsList: bottoms,
      shoesList: shoes,
      accessoriesList: accessories,
    }
  }

  const addItem = (...payload) => {
    console.log("Inside addItem reducer");
    // console.log('payload is :', payload);
    const itemType = payload[0];
    const listName = `${itemType}List`;
    // const lastItemIdString = `last${itemType.charAt(0).toUpperCase()}${itemType.slice(1)}Id`;
    const totalItemIdString = `total${itemType.charAt(0).toUpperCase()}${itemType.slice(1)}`;

    // // const lastItemId = state[lastItemIdString];
    const updatedList = [...state[listName]];
    // const newItemId = lastItemId + 1;
    console.log('updatedList before adding is: ', updatedList);

    const newItemId = state['lastItemId'] + 1;

    const newItem = {
      id: newItemId,
      type: payload[0],
      name: payload[1],
      file: payload[2],
      color: payload[3],
      brand: payload[4],
      size: payload[5],
    };

    console.log("newItem inside addItem reducer is: ", newItem);
    console.log("newItem.file inside addItem reducer is: ", newItem.file);

    updatedList.push(newItem);
    console.log('updatedList after adding is', updatedList);

    return {
      ...state,
      [listName]: updatedList,
      [totalItemIdString]: state[totalItemIdString] + 1,
      lastItemId: newItemId,
    };
  };

  const tryOnItem = (listName, itemId, wornType) => {
    //add conditional where if tried on item already is on (i.e. is in wornType)
    //then we don't add it again (i.e. return {...state} without pushing into array)
    
    const wornItem = state[listName].find(item => item.id === itemId)
    if (state[wornType].includes(wornItem)) {
      return {
        ...state,
      }
    }
    
    const wornItemsArray = state[wornType];
    console.log('state[wornType] is:', state[wornType])
    wornItemsArray.push(wornItem);
    const updatedList = wornItemsArray;
    console.log('state refresh is', state["refresh"]);

    return {
      ...state,
      refresh: !state["refresh"],
      [wornType]: updatedList,
    };
  };

  const takeOffItem = (itemId, wornType) => {
    console.log('itemId is', itemId);
    console.log('wornType is', wornType);
    const wornItemsArray = state[wornType];
    console.log('state[wornType] is:', state[wornType])
    const updatedList = wornItemsArray.filter((item) => itemId !== item.id);

    return {
      ...state,
      refresh: !state["refresh"],
      [wornType]: updatedList,
    };
  }

  const deleteItem = (listName, itemId) => {
    const updatedList = state[listName].filter(item => item.id !== itemId);
    return {
      ...state,
      [listName]: updatedList,
    };
  };

  const updateItem = (itemId, itemList, updatedData) => {
    console.log('itemId is', itemId);
    console.log("updatedData is:", updatedData);
    console.log("itemList is: ", itemList);
    console.log("state[itemList] is", state[itemList]);

    const itemToUpdate = state[itemList].find((item) => item.id === itemId);

    if (!itemToUpdate) {
      console.log('no itemToUpdate');
      return state;
    }

    const updatedItem = {...itemToUpdate, ...updatedData};

    const index = state[itemList].findIndex((item) => item.id === itemId);

    const updatedItemList = [
      ...state[itemList].slice(0, index),
      updatedItem,
      ...state[itemList].slice(index + 1),
    ];

    return {
      ...state,
      [itemList]: updatedItemList,
    };
  };

  switch (action.type) {
    case types.TURN_ON_ALERT:
      console.log('inside TURN_ON_ALERT');
      return {
        ...state,
        isAlertOn: true,
        message: action.payload,
      };
    case types.TURN_OFF_ALERT:
      console.log('inside TURN_OFF_ALERT');
      return {
        ...state,
        isAlertOn: false,
      };

    case types.FETCH_MONGO_DATA_SUCCESS:
      return fillWardrobe(action.payload);//
    case types.FETCH_MONGO_DATA_ERROR:
      return

    case types.ADD_ITEM:
      return addItem(action.payload1, action.payload2, action.payload3, action.payload4, action.payload5, action.payload6);

    case types.TRYON_ITEM:
      const [ itemType, itemId, wornType ] = action.payload;
      // console.log('action payload is: ', action.payload);
      // console.log('in reducer, itemType is: ', itemType);
      return tryOnItem(`${itemType}List`, itemId, `worn${wornType}`);

    case types.TAKEOFF_ITEM:
      const [ takeOffItemId, takeOffWornType ] = action.payload;
      // console.log('action payload is: ', action.payload);
      // console.log('in reducer, itemType is: ', itemType);
      const wornTypeString = takeOffWornType.charAt(0).toUpperCase() + takeOffWornType.slice(1);
      return takeOffItem(takeOffItemId, `worn${wornTypeString}`);

    case types.DELETE_ITEM:
      const [ itemTypeToDelete, itemIdToDelete ] = action.payload;
      console.log('in reducer, itemTypeToDelete is: ', itemTypeToDelete);
      console.log('in DELETE_ITEM reducer', {itemIdToDelete});
      return deleteItem(`${itemTypeToDelete}List`, itemIdToDelete);

    case types.UPDATE_ITEM:
      const [ updatedItemId, itemList, updatedData ] = action.payload;
      console.log('in UPDATE_ITEM case, updatedItemId is:', updatedItemId);
      console.log('in UPDATE_ITEM case, itemList is:', itemList);
      console.log('in UPDATE_ITEM case, updatedData is:', updatedData);
      return updateItem(updatedItemId, itemList, updatedData);

    default: {
      return state;
    };
  };
};

export default wardrobeReducer;