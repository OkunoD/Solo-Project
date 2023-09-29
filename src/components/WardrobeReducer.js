import * as types from '../constants/actionTypes';

const initialState = {
  isAlertOn: false,
  alertColor: 'red',
  message: '',
  refresh: false,
  lastItemId: 0,
  
  wornHeadwearLocked: false,
  wornTopsLocked: false,
  wornJacketsLocked: false,
  wornBottomsLocked: false,
  wornShoesLocked: false,
  wornAccessoriesLocked: false,

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

    const allItemsArray = payload;

    const colorSortedItems = allItemsArray.sort((a,b)=> b.color.localeCompare(a.color));

    // console.log("fillwardrobe payload is", payload);
    // console.log("fillwardrobe payload[0] is", payload[0]);
    // console.log("fillwardrobe payload[0].color is", payload[0].color);

    const headwear = []
    const tops = [];
    const jackets = [];
    const bottoms = [];
    const shoes = [];
    const accessories = [];

    for (let i = 0; i < colorSortedItems.length; i++) {
      if (colorSortedItems[i].type === 'headwear') {
        headwear.push(colorSortedItems[i]); 
      } else if (colorSortedItems[i].type === 'tops') {
        tops.push(colorSortedItems[i]); 
      } else if (colorSortedItems[i].type === 'jackets') {
        jackets.push(colorSortedItems[i]); 
      } else if (colorSortedItems[i].type === 'bottoms') {
        bottoms.push(colorSortedItems[i]); 
      } else if (colorSortedItems[i].type === 'shoes') {
        shoes.push(colorSortedItems[i]); 
      } else if (colorSortedItems[i].type === 'accessories') {
        accessories.push(colorSortedItems[i]); 
      };
    };
        
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
    //(topsList, itemId, wornTops)
    //add conditional where if tried on item already is on (i.e. is in wornType)
    //then we don't add it again (i.e. we should just return {...state} without pushing into array)
    
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
    console.log("`${wornType}Locked`", `${wornType}Locked`);

    return {
      ...state,
      refresh: !state["refresh"],
      [wornType]: updatedList,
      [`${wornType}Locked`]: true,
    };
  };

  const lockItem = (wornItemType) => {
    console.log("state[wornItemType] is:", state[wornItemType])
    console.log({wornItemType});

    return {
      ...state,
      [wornItemType]: !state[wornItemType],
    }
  }

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
      [`${wornType}Locked`]: false,
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
  
  const sortDrawer = (clothingType, property) => {
    const listName = `${clothingType}List`;
    const updatedList = state[listName].sort((a,b) => a[property].localeCompare(b[property]));
    
    console.log("property is", property);
    console.log("clothingType is", clothingType);
    console.log("listName is", listName);
    console.log("updatedList is", updatedList);

    return {
      ...state,
      refresh: !state["refresh"],
      [listName]: updatedList,
    }
  };

  const filterDrawer = (clothingType, properties) => {

  }

  const randomizeOutfit = () => {
    const getRandomItem = (itemList) => {
      const randomIndex = Math.floor(Math.random() * itemList.length);
      return itemList[randomIndex];
    }
    const randomHeadwear = getRandomItem(state.headwearList);
    const randomTop = getRandomItem(state.topsList);
    const randomJacket = getRandomItem(state.jacketsList);
    const randomBottom = getRandomItem(state.bottomsList);
    const randomShoe = getRandomItem(state.shoesList);
    const randomAccessory = getRandomItem(state.accessoriesList);

    console.log("state.wornHeadwearLocked",state.wornHeadwearLocked);

    return {
      ...state,
      wornHeadwear: (state.wornHeadwearLocked===false) ? [randomHeadwear] : state.wornHeadwear,
      wornTops: (state.wornTopsLocked===false) ? [randomTop] : state.wornTops,
      wornJackets: (state.wornJacketsLocked===false) ? [randomJacket] : state.wornJackets,
      wornBottoms: (state.wornBottomsLocked===false) ? [randomBottom] : state.wornBottoms,
      wornShoes: (state.wornShoesLocked===false) ? [randomShoe] : state.wornShoes,
      wornAccessories: (state.wornAccessoriesLocked===false) ? [randomAccessory] : state.wornAccessories,
    }
  }
  const clearOutfit = () => {
    return {
      ...state,
      wornHeadwear: [],
      wornTops: [],
      wornJackets: [],
      wornBottoms: [],
      wornShoes: [],
      wornAccessories: [],
      wornHeadwearLocked: false,
      wornTopsLocked: false,
      wornJacketsLocked: false,
      wornBottomsLocked: false,
      wornShoesLocked: false,
      wornAccessoriesLocked: false,
    }
  }

  switch (action.type) {
    case types.TURN_ON_ALERT:
      console.log('inside TURN_ON_ALERT');
      return {
        ...state,
        isAlertOn: true,
        message: action.payload[0],
        alertColor: action.payload[1],
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

    case types.SORT_DRAWER:
      const [ clothingType, property ] = action.payload;
      return sortDrawer(clothingType, property);

    case types.RANDOMIZE_OUTFIT:
      return randomizeOutfit();

    case types.CLEAR_OUTFIT:
      return clearOutfit();

    case types.LOCK_ITEM:
      const [ wornItemType ] = action.payload;
      return lockItem(wornItemType);

    default: {
      return state;
    };
  };
};

export default wardrobeReducer;