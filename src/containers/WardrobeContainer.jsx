import React from 'react';
import { connect } from 'react-redux';
import '../components/styles.css';

// import WardrobeReducer from '../components/WardrobeReducer.js';

// import from child components...
import ItemCreator from '../components/ItemCreator';
import HeadwearDrawer from '../components/HeadwearDrawer.jsx';
import TopsDrawer from '../components/TopsDrawer.jsx';
import JacketsDrawer from '../components/JacketsDrawer.jsx';
import BottomsDrawer from '../components/BottomsDrawer.jsx';
import ShoesDrawer from '../components/ShoesDrawer.jsx';
import AccessoriesDrawer from '../components/AccessoriesDrawer.jsx';
import Dispatch from 'react';

const mapStateToProps = state => ({  
});
  
function WardrobeContainer() {
  return(
    <div className="wardrobeContainer">
      <div className="outerBox">
        <h1 id="header">Your Wardrobe</h1>
        { /* Start adding components here... */ }
        <ItemCreator />
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