import * as types from '../constants/actionTypes.js';

const initialState = {
  totalMarkets: 0,
  totalCards: 30,
  marketList: [],
  lastMarketId: 10000,
  newLocation: '',
  cards: 0,
  percentOfTotal: 0

//what do we want initial state to be? 
    //user data from DB for their account
        //an array of objects for headwear
            //object will have the source image url 
        //an array of objects for their tops
        //an array of objects for their jackets
        //an array of objects for their bottoms
        //an array of objects for their shoes
    //current headwear
    //current top
    //current jacket
    //current bottoms
    //current shoes
};

const wardrobeReducer = (state = initialState, action) => {
  let marketList;

  switch (action.type) {
    case types.ADD_MARKET:
      // increment lastMarketId and totalMarkets counters
      const lastMarketId = state.lastMarketId + 1;
      const totalMarkets = state.totalMarkets + 1;
      const cards = state.cards;
      const percentOfTotal = state.percentOfTotal;
      //return Object.assign({}, state, {lastMarketId: action.payload, totalMarkets: action.payload})
      // create the new market object from provided data
      const newMarket = {
        // what goes in here?
        marketId: lastMarketId,
        cards: 0,
        percentOfTotal: percentOfTotal
      };

      // push the new market onto a copy of the market list
      marketList = state.marketList.slice();
      marketList.push(newMarket);

      // return updated state
      return {
        ...state,
        marketList,
        lastMarketId,
        totalMarkets,
        newLocation: '',
      };
      // this + spread operator is telling us which parts of state we should have
      //changed in this case
      //spread operator is helping us send changes to state
      // this is that stupid notation we were asking about in vance's lecture
    case types.SET_NEW_LOCATION:
      
      return {
        ...state,
        newLocation: action.payload,
      };
    case types.ADD_CARD:
      return Object.assign({},state, {})

      //navigate to marketlist array
     // state.marketList[].cards

    case types.DELETE_CARD: 

    default: {
      return state;
    }
  }
};

export default wardrobeReducer;



/*

import * as types from '../constants/actionTypes';

const initialState = {
    totalHeadwear: 0,
    totalTops: 0,
    totalJackets: 0,
    totalBottoms: 0,
    totalShoes: 0,
    totalAccessories: 0,
    headwearList: [],
    topsList: [],
    jacketsList: [],
    bottomsList: [],
    shoesList: [],
    accessoriesList: [],
}

put the post/fetch inside the frontend
    in same action 


const wardrobeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_HEADWEAR:
            {

            }
        case types.ADD_TOP:
            {

            }
        case types.ADD_JACKET:
            {

            }
        case types.ADD_BOTTOM:
            {

            }
        case types.ADD_SHOES:
            {

            }
        case types.ADD_ACCESSORY:
            {

            }
        case types.TRYON_HEADWEAR:
            {

            }
        case types.TRYON_TOP:
            {

            }
        case types.TRYON_JACKET:
            {

            }
        case types.TRYON_BOTTOM:
            {

            }
        case types.TRYON_SHOES:
            {

            }
        case types.TRYON_ACCESSORY:
            {

            }
    }
}

export default wardrobeReducer;

*/