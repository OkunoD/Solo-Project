import React, { Component } from 'react';
import { connect, useDispatch } from 'react-redux';
//import { Link } from 'react-router-dom';
import HeadwearCard from './HeadwearCard.jsx';
import HeadwearCreator from './ItemCreatorModal.jsx';
import { addHeadwearctionCreator, deleteHeadwearActionCreator, sortDrawerActionCreator } from '../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        headwear: state.headwearList
    };
};


const HeadwearDrawer = props => {
    const dispatch = useDispatch();
    
    const headwear = []; 
    const arrOfHeadwear = props.headwear;
    const sortedHeadwear = [];

    const sortDrawer = (clothingType, property) => {
        dispatch(sortDrawerActionCreator(clothingType, property));
    }

    for (let i = 0; i < arrOfHeadwear.length; i++) {
        const currentHeadwear = arrOfHeadwear[i];
        headwear.push(
            <HeadwearCard
                key = {currentHeadwear.id}
                headwearName={currentHeadwear.name}
                headwearId={currentHeadwear.id}
                headwearColor={currentHeadwear.color}
                imgUrl={currentHeadwear.imgUrl}
                index = {i}
            />);
    }
    return(
        <div className="clothingBox" data-testid="headwear-drawer">
            <div className="categoryHeaders">Headwear
            <select className="sort-by-select-list" data-testid="sort-by-select-list" onChange={(e)=>sortDrawer("headwear", e.target.value)}>
                <option value="color">Color</option>
                <option value="designer">Designer</option>
                <option value="subtype">Subtype</option>
                <option value="size">Size</option>
            </select>
            </div>
            <div className="yourClothing">
            {headwear}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (HeadwearDrawer);