import React, {useEffect, useState} from 'react';
import { useSelector, connect } from 'react-redux';
import Header from './Header.jsx';
import { fillWardrobeActionCreator } from '../actions/actions';
import WardrobeContainer from '../containers/WardrobeContainer.jsx'
import OutfitContainer from '../containers/OutfitContainer.jsx';
import ItemCreator from './ItemCreatorModal.jsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { mockData } from '../../mockData.js';
import Alert from './Alert.jsx';

// import './styles.css';

const mapDispatchToProps = dispatch => ({
    fillWardrobe : (payload) => dispatch(fillWardrobeActionCreator(payload)),
});

const App = (props) => {
    const state = useSelector((state) => state);

    // const message = useSelector((state) => state.message);
    // const isAlertOn = useSelector((state) => state.isAlertOn);


    useEffect(() => {
        if (process.env.NODE_ENV==='development') {
          console.log({mockData});
          props.fillWardrobe(mockData);
        } else {
          fetch('/api/items')
            .then((response) => {
              console.log('response is: ', response);
              return response.json();
            })
            .then((data) => {
              console.log('data is: ', data);
              props.fillWardrobe(data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
      }, []);

    return(
        <>
            <Header/>
            <Alert message={state.message}/>
            <Routes>
                <Route exact path="/" element={<WardrobeContainer/>}/>
                <Route exact path="/outfits" element={<OutfitContainer/>}/>
                {/* <Route exact path="/addItem" element={<ItemCreator/>}/> */}
            </Routes>
        </>
    );
}

export default connect(null, mapDispatchToProps) (App);