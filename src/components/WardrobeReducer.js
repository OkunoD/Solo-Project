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
    lastTopId: 0,
    selectedTop: {},

    jacketsList: [],
    lastJacketId: 0,
    selectedJacket: {},

    bottomsList: [],
    lastBottomId: 0,
    selectedBottom: {},

    shoesList: [],
    lastShoesId: 0,
    selectedShoes: {},

    accessoriesList: [],
    lastAccessoryId: 0,
    selectedAccessory: {}
}

const deleteItemById = (list, itemId) => {
  return list.filter(item => item.id !== itemId);
}
// put the post/fetch inside the frontend
//     in same action 

const wardrobeReducer = (state = initialState, action) => {

  const deleteItem = (listName, itemId) => {
    const updatedList = state[listName].filter(item => item.id !== itemId);
    return {
      ...state,
      [listName]: updatedList,
    };
  };
  const tryOnItem = (listName, itemId, selectedType) => {
    console.log('listName is: ', listName);
    console.log('itemId is: ', itemId);
    console.log('selectedType is: ', selectedType);
    const wornItem = state[listName].find(item => item.id === itemId)
    console.log('wornItem is: ', wornItem);
    return {
      ...state,
      [selectedType]: wornItem,
    }
  }

  let headwearList;
  let topsList;
  let jacketsList;
  let bottomsList;
  let shoesList;
  let accessoriesList;

    switch (action.type) {
        case types.ADD_HEADWEAR:
            {
              let lastHeadwearId = state.lastHeadwearId;
              lastHeadwearId++;
              let totalHeadwear = state.totalHeadwear;
              totalHeadwear++;
              
              const newHeadwear = {
                id: lastHeadwearId,
                name: action.payload1,
                imgUrl: action.payload2,
                color: action.payload3,
              };
              headwearList = state.headwearList.slice();
              headwearList.push(newHeadwear);

              return{
                ...state,
                totalHeadwear,
                headwearList,
                lastHeadwearId,
              };
            }
        case types.ADD_TOP:
            {
              let lastTopId = state.lastTopId;
              lastTopId++;
              let totalTops = state.totalTops;
              totalTops++;

              const newTop = {
                id: lastTopId,
                name: action.payload1,
                imgUrl: action.payload2,
                color: action.payload3,
              };
              topsList = state.topsList.slice();
              topsList.push(newTop);

              return{
                ...state,
                totalTops,
                topsList,
                lastTopId,
              };
            }
        case types.ADD_JACKET:
            {
              let lastJacketId = state.lastJacketId;
              lastJacketId++;
              let totalJackets = state.totalJackets;
              totalJackets++;

              const newJacket = {
                id: lastJacketId,
                name: action.payload1,
                imgUrl: action.payload2,
                color: action.payload3,
              };
              jacketsList = state.jacketsList.slice();
              jacketsList.push(newJacket);

              return{
                ...state,
                totalJackets,
                jacketsList,
                lastJacketId,
              };
            }
        case types.ADD_BOTTOM:
            {
              let lastBottomId = state.lastBottomId;
              lastBottomId++;
              let totalBottoms = state.totalBottoms;
              totalBottoms++;

              const newBottom = {
                id: lastBottomId,
                name: action.payload1,
                imgUrl: action.payload2,
                color: action.payload3,
              };
              bottomsList = state.bottomsList.slice();
              bottomsList.push(newBottom);

              return{
                ...state,
                totalBottoms,
                bottomsList,
                lastBottomId,
              };
            }
        case types.ADD_SHOES:
            {
              let lastShoesId = state.lastShoesId;
              lastShoesId++;
              let totalShoes = state.totalShoes;
              totalShoes++;

              const newShoes = {
                id: lastShoesId,
                name: action.payload1,
                imgUrl: action.payload2,
                color: action.payload3,
              };
              shoesList = state.shoesList.slice();
              shoesList.push(newShoes);

              return{
                ...state,
                totalShoes,
                shoesList,
                lastShoesId,
              };
            }
        case types.ADD_ACCESSORY:
            {
              let lastAccessoryId = state.lastAccessoryId;
              lastAccessoryId++;
              let totalAccessories = state.totalAccessories;
              totalAccessories++;

              const newAccessory = {
                id: lastAccessoryId,
                name: action.payload1,
                imgUrl: action.payload2,
                color: action.payload3,
              };
              accessoriesList = state.accessoriesList.slice();
              accessoriesList.push(newAccessory);

              return{
                ...state,
                totalAccessories,
                accessoriesList,
                lastAccessoryId,
              };
            }
        case types.TRYON_HEADWEAR:{
              return tryOnItem('headwearList', action.payload, 'selectedHeadwear');
              // let selectedHeadwear = state.selectedHeadwear;
              // selectedHeadwear = state.headwearList.find(item => item.id === action.payload);
              // console.log(selectedHeadwear);
              // return{
              //   ...state,
              //   selectedHeadwear,
              // };
            }
        case types.TRYON_TOP:
            {
              let selectedTop = state.selectedTop;
              selectedTop = state.topsList.find(item => item.id === action.payload);

              return{
                ...state,
                selectedTop,
              };
            }
        case types.TRYON_JACKET:
            {
              let selectedJacket = state.selectedJacket;
              selectedJacket = state.jacketsList.find(item => item.id === action.payload);

              return{
                ...state,
                selectedJacket,
              };
            }
        case types.TRYON_BOTTOM:
            {
              let selectedBottom = state.selectedBottom;
              selectedBottom = state.bottomsList.find(item => item.id === action.payload);

              return{
                ...state,
                selectedBottom,
              };
            }
        case types.TRYON_SHOES:
            {
              let selectedShoes = state.selectedShoes;
              selectedShoes = state.shoesList.find(item => item.id === action.payload);

              return{
                ...state,
                selectedShoes,
              };
            }
        case types.TRYON_ACCESSORY:
            {
              let selectedAccessory = state.selectedAccessory;
              selectedAccessory = state.accessoriesList.find(item => item.id === action.payload);

              return{
                ...state,
                selectedAccessory,
              };
            }

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
        }
    }
};

export default wardrobeReducer;

//to add later: delete item reducers