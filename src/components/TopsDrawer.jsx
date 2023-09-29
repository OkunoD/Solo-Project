import React, { Component } from 'react';
import { connect, useDispatch } from 'react-redux';
//import { Link } from 'react-router-dom';
import TopsCard from './TopsCard.jsx';
import ItemCreator from './ItemCreatorModal.jsx';//change to itemCreator
import { addTopActionCreator, deleteTopActionCreator, sortDrawerActionCreator } from '../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        tops: state.topsList
    };
};


const TopsDrawer = props => {
    const dispatch = useDispatch();

    const tops = []; 
    const arrOfTops = props.tops;
    const sortedTops = [];


    for (let i = 0; i < arrOfTops.length; i++) {
        const currentTop = arrOfTops[i];
        tops.push(
            <TopsCard
                key = {currentTop.id}
                topName={currentTop.name}
                topId={currentTop.id}
                topColor={currentTop.color}
                imgUrl={currentTop.imgUrl}
                index = {i}
            />);
    }

    const sortDrawer = (clothingType, property) => {
        dispatch(sortDrawerActionCreator(clothingType, property));
    }

    return(
        <div className="clothingBox" data-testid="tops-drawer">
            <div className="categoryHeaders">Tops</div>
            <select className="sort-by-select-list" data-testid="sort-by-select-list" onChange={(e)=>sortDrawer("tops", e.target.value)}>
                <option value="color">Color</option>
                <option value="designer">Designer</option>
                <option value="subtype">Subtype</option>
                <option value="size">Size</option>
            </select>
            <div className="yourClothing">
            {tops}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (TopsDrawer);