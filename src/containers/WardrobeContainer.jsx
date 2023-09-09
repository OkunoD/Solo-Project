import React from 'react';
import { connect } from 'react-redux';

// import WardrobeReducer from '../components/WardrobeReducer.js';

// import from child components...
import ItemCreator from '../components/ItemCreator';
import HeadwearDrawer from '../components/HeadwearDrawer.jsx';
import TopsDrawer from '../components/TopsDrawer.jsx';
import JacketsDrawer from '../components/JacketsDrawer.jsx';
import BottomsDrawer from '../components/BottomsDrawer.jsx';
import ShoesDrawer from '../components/ShoesDrawer.jsx';
import AccessoriesDrawer from '../components/AccessoriesDrawer.jsx';
import Outfit from '../components/Outfit';
import Dispatch from 'react';

const mapStateToProps = state => ({  
});
  
const WardrobeContainer = () => {
  return(
    <div className="wardrobe-container">
      <div className="outerBox">
        <div className="header"><strong>&nbsp;&nbsp;MY CLOSET</strong></div>
        { /* Start adding components here... */ }
        <ItemCreator />
        <Outfit />
        <HeadwearDrawer />
        <TopsDrawer />
        <JacketsDrawer />
        <BottomsDrawer />
        <ShoesDrawer />
        <AccessoriesDrawer />
      </div>
    </div>
  );
}

export default connect(mapStateToProps, null)(WardrobeContainer);