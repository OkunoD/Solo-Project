import React, { Component } from 'react';
import { connect, useDispatch } from 'react-redux';
import JacketsCard from './JacketsCard.jsx';
import { sortDrawerActionCreator } from '../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        jackets: state.jacketsList
    };
};


const JacketsDrawer = props => {

    const jackets = []; 
    const arrOfJackets = props.jackets;
    const dispatch = useDispatch();

    const sortDrawer = (clothingType, property) => {
        dispatch(sortDrawerActionCreator(clothingType, property));
    }

    for (let i = 0; i < arrOfJackets.length; i++) {
        const currentJacket = arrOfJackets[i];
        jackets.push(
            <JacketsCard
                key = {currentJacket.id}
                jacketName={currentJacket.name}
                jacketId={currentJacket.id}
                jacketColor={currentJacket.color}
                imgUrl={currentJacket.imgUrl}
                index = {i}
            />);
    }
    return(
        <div className="clothingBox" data-testid="jackets-drawer">
            <div className="categoryHeaders">Jackets
                <p className="drawer-filters">sort by:</p>
                    <select className="sort-by-select-list" data-testid="sort-by-select-list" onChange={(e)=>sortDrawer("jackets", e.target.value)}>
                        <option value="color">Color</option>
                        <option value="brand">Brand</option>
                        <option value="size">Size</option>
                        {/* <option value="subtype">Subtype</option> */}
                    </select>
            </div>
            <div className="yourClothing">
            {jackets}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (JacketsDrawer);