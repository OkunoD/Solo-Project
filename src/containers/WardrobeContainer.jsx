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
  // useEffect(() => {
  //   if (process.env.NODE_ENV==='development') {
  //     console.log({mockData});
  //     props.fillWardrobe(mockData);
  //   } else {
  //     fetch('/api/items')
  //       .then((response) => {
  //         console.log('response is: ', response);
  //         return response.json();
  //       })
  //       .then((data) => {
  //         console.log('data is: ', data);
  //         props.fillWardrobe(data);
  //       })
  //       .catch((error) => {
  //         console.error('Error:', error);
  //       });
  //   }
  // }, []);

  return(
    <div className="wardrobe-container">
      {/* <div className="outerBox"> */}
        <Header view={"myCloset"}/>
        {/* <ItemCreator /> */}
        <Outfit />
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