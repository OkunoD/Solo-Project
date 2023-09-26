import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import AccessoriesCard from './AccessoriesCard.jsx';
import ItemCreator from './ItemCreatorModal.jsx';//change to itemCreator
import { addAccessoriesActionCreator, deleteAccessoryActionCreator } from '../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        accessories: state.accessoriesList
    };
};


const AccessoriesDrawer = props => {
    const accessories = []; 
    const arrOfAccessories = props.accessories;
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
            <div className="categoryHeaders">Accessories</div>
            <div className="yourClothing">
            {accessories}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (AccessoriesDrawer);