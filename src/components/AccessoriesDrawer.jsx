import React, { Component } from 'react';
import { connect, useDispatch } from 'react-redux';
import AccessoriesCard from './AccessoriesCard.jsx';
import { sortDrawerActionCreator } from '../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        accessories: state.accessoriesList
    };
};


const AccessoriesDrawer = props => {

    const accessories = []; 
    const arrOfAccessories = props.accessories;
    const dispatch = useDispatch();

    const sortDrawer = (clothingType, property) => {
        dispatch(sortDrawerActionCreator(clothingType, property));
    };

    for (let i = 0; i < arrOfAccessories.length; i++) {
        const currentAccessory = arrOfAccessories[i];
        accessories.push(
            <AccessoriesCard
                key = {currentAccessory.id}
                accessoryName={currentAccessory.name}
                accessoryId={currentAccessory.id}
                acccessoryColor={currentAccessory.color}
                imgUrl={currentAccessory.imgUrl}
                index = {i}
            />);
    }
    return(
        <div className="clothingBox" data-testid="accessories-drawer">
            <div className="categoryHeaders">Accessories
                <p className="drawer-filters">sort by:</p>
                    <select className="sort-by-select-list" data-testid="sort-by-select-list" onChange={(e)=>sortDrawer("accessories", e.target.value)}>
                        <option value="color">Color</option>
                        <option value="brand">Brand</option>
                        <option value="size">Size</option>
                        <option value="subtype">Subtype</option>
                    </select>
                </div>
            <div className="yourClothing">
            {accessories}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (AccessoriesDrawer);