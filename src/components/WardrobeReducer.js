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
  wornUnderwearLocked: false,

  headwearColorsArray: [],
  headwearBrandsArray: [],
  headwearSizesArray: [],
  headwearSubtypesArray: [],

  topsColorsArray: [],
  topsBrandsArray: [],
  topsSizesArray: [],
  topsSubtypesArray: [],

  jacketsColorsArray: [],
  jacketsBrandsArray: [],
  jacketsSizesArray: [],
  jacketsSubtypesArray: [],

  bottomsColorsArray: [],
  bottomsBrandsArray: [],
  bottomsSizesArray: [],
  bottomsSubtypesArray: [],

  shoesColorsArray: [],
  shoesBrandsArray: [],
  shoesSizesArray: [],
  shoesSubtypesArray: [],

  accessoriesColorsArray: [],
  accessoriesBrandsArray: [],
  accessoriesSizesArray: [],
  accessoriesSubtypesArray: [],

  underwearColorsArray: [],
  underwearBrandsArray: [],
  underwearSizesArray: [],
  underwearSubtypesArray: [],
  
  headwearListUnfiltered: [],
  headwearList: [],
  wornHeadwear: [],
  
  topsListUnfiltered: [],
  topsList: [],
  wornTops: [],
  
  jacketsListUnfiltered: [],
  jacketsList: [],
  wornJackets: [],
  
  bottomsListUnfiltered: [],
  bottomsList: [],
  wornBottoms: [],
  
  shoesListUnfiltered: [],
  shoesList: [],
  wornShoes: [],
  
  accessoriesListUnfiltered: [],
  accessoriesList: [],
  wornAccessories: [],

  underwearListUnfiltered: [],
  underwearList: [],
  wornUnderwear: [],
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
    const undergarments = [];

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
      } else if (colorSortedItems[i].type === 'undergarments') {
        undergarments.push(colorSortedItems[i]); 
      };;
    };
        
    return {
      ...state,
      lastItemId: payload[payload.length-1].id,
      headwearListUnfiltered: headwear,
      headwearList: headwear,
      topsListUnfiltered: tops,
      topsList: tops,
      jacketsListUnfiltered: jackets,
      jacketsList: jackets,
      bottomsListUnfiltered: bottoms,
      bottomsList: bottoms,
      shoesListUnfiltered: shoes,
      shoesList: shoes,
      accessoriesListUnfiltered: accessories,
      accessoriesList: accessories,
      undergarmentsListUnfiltered: undergarments,
      undergarmentsList: undergarments,
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

    console.log('state inside sortDrawer is', state);
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

  const filterDrawer = (...payload) => {
    const clothingType = payload[0];
    const colorFilter = payload[1]; //array of colors to filter in
    const brandFilter = payload[2]; //array of brands to filter in
    const sizeFilter = payload[3]; //array of sizes to filter in
    const subtypeFilter = payload[4]; //array of subtypes to filter in

    const listName = `${clothingType}List`;
    const listNameUnfiltered = `${clothingType}ListUnfiltered`;
    
    const filteredList = state[listNameUnfiltered].filter((item) => {
      return (
        (colorFilter.length === 0 || colorFilter.includes(item.color)) &&
        (brandFilter.length === 0 || brandFilter.includes(item.brand)) &&
        (sizeFilter.length === 0 || sizeFilter.includes(item.size)) &&
        (subtypeFilter.length === 0 || subtypeFilter.includes(item.subType))
      );
    })

    return {
      ...state,
      [listName]: filteredList,
    }
  }
  
  const getFilterArrays = (clothingType) => {
    
    const listName = `${clothingType}ListUnfiltered`;
    
    const allColors = [];
    const allBrands = [];
    const allSizes =  [];
    const allSubtypes = [];

    for (let i = 0; i < state[listName].length; i++) {
      if (!allColors.includes(state[listName][i].color)) {
        allColors.push(state[listName][i].color);
      };
      if (!allBrands.includes(state[listName][i].brand)) {
        allBrands.push(state[listName][i].brand);
      };
      if (!allSizes.includes(state[listName][i].size)) {
        allSizes.push(state[listName][i].size);
      };
      if (!allSubtypes.includes(state[listName][i].subtype)) {
        allSubtypes.push(state[listName][i].subtype);
      };
    };

    return {
      ...state,
      [`${clothingType}ColorsArray`]: allColors,
      [`${clothingType}BrandsArray`]: allBrands,
      [`${clothingType}SizesArray`]: allSizes,
      [`${clothingType}SubtypesArray`]: allSubtypes,
    }
  }

  const randomizeOutfit = () => {
    const getRandomItem = (itemList) => {
      const capitalized = `${itemList[0].type.charAt(0).toUpperCase()}${itemList[0].type.slice(1)}`
      const wornList = `worn${capitalized}`;
      const randomIndex = Math.floor(Math.random() * itemList.length);

      // console.log("itemList is", itemList);
      // console.log("itemList[0].type is", itemList[0].type);
      // console.log("capitalized is", capitalized);
      // console.log('wornList is', wornList);

      if (state[wornList].includes(itemList[randomIndex])) {
        return getRandomItem(itemList);
      } else if (!state[wornList].includes(itemList[randomIndex])){
        return itemList[randomIndex];
      }
    }
    const randomHeadwear = (state.wornHeadwearLocked===false && state.headwearList.length !==0) ? [getRandomItem(state.headwearList)] : state.wornHeadwear;
    const randomTop = (state.wornTopsLocked===false && state.topsList.length !==0) ? [getRandomItem(state.topsList)] : state.wornTops;
    const randomJacket = (state.wornJacketsLocked===false && state.jacketsList.length !==0) ? [getRandomItem(state.jacketsList)] : state.wornJackets;
    const randomBottom = (state.wornBottomsLocked===false && state.bottomsList.length !==0) ? [getRandomItem(state.bottomsList)] : state.wornBottoms;
    const randomShoe = (state.wornShoesLocked===false && state.shoesList.length !==0) ? [getRandomItem(state.shoesList)] : state.wornShoes;
    const randomAccessory = (state.wornAccessoriesLocked===false && state.accessoriesList.length !==0) ? [getRandomItem(state.accessoriesList)] : state.wornAccessories;
    const randomUnderwear = (state.wornUnderwearLocked===false && state.underwearList.length!==0) ? [getRandomItem(state.underwearList)] : state.wornUnderwear;

    return {
      ...state,
      wornHeadwear: randomHeadwear,
      wornTops: randomTop,
      wornJackets:randomJacket,
      wornBottoms: randomBottom,
      wornShoes: randomShoe,
      wornAccessories: randomAccessory,
      wornUnderwear: randomUnderwear,
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
      wornUnderwearLocked: false,
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

    case types.GET_FILTER_ARRAYS:
      return getFilterArrays(action.payload);

    case types.FILTER_DRAWER:
      return filterDrawer(...action.payload);

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