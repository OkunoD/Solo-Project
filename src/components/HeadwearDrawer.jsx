import React, { Component } from 'react';
import { connect, useDispatch } from 'react-redux';
import HeadwearCard from './HeadwearCard.jsx';
import { sortDrawerActionCreator } from '../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        headwear: state.headwearList
    };
};


const HeadwearDrawer = props => {
    
    const headwear = []; 
    const arrOfHeadwear = props.headwear;
    const dispatch = useDispatch();

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
            <p className="drawer-filters">sort by:</p>
                <select className="sort-by-select-list" data-testid="sort-by-select-list" onChange={(e)=>sortDrawer("headwear", e.target.value)}>
                    <option value="color">Color</option>
                    <option value="brand">Brand</option>
                    <option value="size">Size</option>
                    <option value="subtype">Subtype</option>
                </select>
            </div>
            <div className="yourClothing">
            {headwear}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (HeadwearDrawer);