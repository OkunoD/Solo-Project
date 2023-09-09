import React, {useEffect, useState} from 'react';
import { useSelector, connect } from 'react-redux';
import Header from './Header.jsx';
import { fillWardrobeActionCreator } from '../actions/actions';
import WardrobeContainer from '../containers/WardrobeContainer.jsx'
import OutfitContainer from '../containers/OutfitContainer.jsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


// import './styles.css';

const mapDispatchToProps = dispatch => ({
    fillWardrobe : (payload) => dispatch(fillWardrobeActionCreator(payload)),
});

const App = (props) => {
    const state = useSelector((state) => state);

    useEffect(() => {
        console.log('useeffect hit')
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
        <Router>
            <Header/>
            <Routes>
                <Route exact path="/" element={<WardrobeContainer/>}/>
                <Route exact path="/outfits" element={<OutfitContainer/>}/>
            </Routes>
        </Router>
    );
}

export default connect(null, mapDispatchToProps) (App);