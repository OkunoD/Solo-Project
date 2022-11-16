import React, { Component } from 'react';
import { connect } from 'react-redux';
// import WardrobeReducer from '../components/WardrobeReducer.js';

// import from child components...
import HeadwearDrawer from '../components/HeadwearDrawer.jsx';
import TopsDrawer from '../components/TopsDrawer.jsx';
import JacketsDrawer from '../components/JacketsDrawer.jsx';
import BottomsDrawer from '../components/BottomsDrawer.jsx';
import ShoesDrawer from '../components/ShoesDrawer.jsx';
import Dispatch from 'react';

const mapStateToProps = state => {  
    //totalCards: state.totalCards 
    // add pertinent state here
   // this is a function, need a return
   //return an object with what changes to make to state
   //also maybe state.props.totalMarkets?
   return {
    totalCards : state.markets.totalCards,
    totalMarkets : state.markets.totalMarkets
  }
  }
  
  class WardrobeContainer extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return(
        <div className="container">
          <div className="outerBox">
            <h1 id="header">Your Wardrobe</h1>
            { /* Start adding components here... */ }
            <HeadwearDrawer />
            <TopsDrawer />
            <JacketsDrawer />
            <BottomsDrawer />
            <ShoesDrawer />
          </div>
        </div>
      );
    }
  
  }
  
  export default connect(mapStateToProps, null)(WardrobeContainer);