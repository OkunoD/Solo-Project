import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import TopsCard from './TopsCard.jsx';
import ItemCreator from './ItemCreator';//change to itemCreator
import { addTopActionCreator, deleteTopActionCreator } from '../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        tops: state.topsList
    };
};


const TopsDrawer = props => {
    const tops = []; 
    const arrOfTops = props.tops;
    for (let i = 0; i < arrOfTops.length; i++) {
        const currentTop = arrOfTops[i];
        tops.push(
            <TopsCard
                key = {i}
                topName={currentTop.name}
                topId={currentTop.id}
                topColor={currentTop.color}
                imgUrl={currentTop.imgUrl}
                index = {i}
            />);
    }
    return(
        <div className="clothingBox">
            <div className="categoryHeaders">Tops</div>
            <div className="yourClothing">
            {tops}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (TopsDrawer);