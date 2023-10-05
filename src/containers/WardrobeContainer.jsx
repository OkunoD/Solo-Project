import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

// import WardrobeReducer from '../components/WardrobeReducer.js';

// import from child components...
import { fillWardrobeActionCreator } from '../actions/actions';
import { mockData } from '../../mockData.js';

import ItemCreator from '../components/ItemCreatorModal';
import HeadwearDrawer from '../components/HeadwearDrawer.jsx';
import TopsDrawer from '../components/TopsDrawer.jsx';
import JacketsDrawer from '../components/JacketsDrawer.jsx';
import BottomsDrawer from '../components/BottomsDrawer.jsx';
import ShoesDrawer from '../components/ShoesDrawer.jsx';
import AccessoriesDrawer from '../components/AccessoriesDrawer.jsx';
import ItemCreatorModal from '../components/ItemCreatorModal';
import Outfit from '../components/Outfit';
import Header from '../components/Header';
import Dispatch from 'react';



const mapDispatchToProps = dispatch => ({  
  fillWardrobe : (payload) => dispatch(fillWardrobeActionCreator(payload)),
});
  
const WardrobeContainer = (props) => {

  return(
    <div className="wardrobe-container">
      {/* <div className="outerBox"> */}
        <Header view={"myCloset"}/>
        {/* <ItemCreator /> */}
        <Outfit />
        <div className="wardrobe-spacer"> </div>
        <HeadwearDrawer />
        <TopsDrawer />
        <JacketsDrawer />
        <BottomsDrawer />
        <ShoesDrawer />
        <AccessoriesDrawer />
      {/* </div> */}
    </div>
  );
}

export default connect(null, mapDispatchToProps)(WardrobeContainer);