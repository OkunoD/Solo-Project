import React, { Component } from 'react';
import { connect, useDispatch } from 'react-redux';
import TopsCard from './TopsCard.jsx';
import { sortDrawerActionCreator } from '../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        tops: state.topsList
    };
};


const TopsDrawer = props => {
    
    const tops = []; 
    const arrOfTops = props.tops;
    const dispatch = useDispatch();

    const sortDrawer = (clothingType, property) => {
        dispatch(sortDrawerActionCreator(clothingType, property));
    };

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
    };

    return(
        <div className="clothingBox" data-testid="tops-drawer">
            <div className="categoryHeaders">Tops
            <p className="drawer-filters">sort by:</p>
                <select className="sort-by-select-list" data-testid="sort-by-select-list" onChange={(e)=>sortDrawer("tops", e.target.value)}>
                    <option value="color">Color</option>
                    <option value="brand">Brand</option>
                    <option value="size">Size</option>
                    {/* <option value="subtype">Subtype</option> */}
                </select>
            </div>
            <div className="yourClothing">
            {tops}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (TopsDrawer);