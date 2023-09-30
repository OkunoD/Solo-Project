import React, { Component } from 'react';
import { connect, useDispatch } from 'react-redux';
import BottomsCard from './BottomsCard.jsx';
import { sortDrawerActionCreator } from '../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        bottoms: state.bottomsList
    };
};


const BottomsDrawer = props => {

    const bottoms = []; 
    const arrOfBottoms = props.bottoms;
    const dispatch = useDispatch();

    const sortDrawer = (clothingType, property) => {
        dispatch(sortDrawerActionCreator(clothingType, property));
    }

    for (let i = 0; i < arrOfBottoms.length; i++) {
        const currentBottom = arrOfBottoms[i];
        bottoms.push(
            <BottomsCard
                key = {currentBottom.id}
                bottomName={currentBottom.name}
                bottomId={currentBottom.id}
                bottomColor={currentBottom.color}
                imgUrl={currentBottom.imgUrl}
                index = {i}
            />);
    }
    return(
        <div className="clothingBox" data-testid="bottoms-drawer">
            <div className="categoryHeaders">Bottoms
                <p className="drawer-filters">sort by:</p>
                    <select className="sort-by-select-list" data-testid="sort-by-select-list" onChange={(e)=>sortDrawer("bottoms", e.target.value)}>
                        <option value="color">Color</option>
                        <option value="brand">Brand</option>
                        <option value="size">Size</option>
                        {/* <option value="subtype">Subtype</option> */}
                    </select>
                </div>
            <div className="yourClothing">
            {bottoms}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (BottomsDrawer);