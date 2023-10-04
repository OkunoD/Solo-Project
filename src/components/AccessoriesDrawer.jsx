import React, { Component, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import AccessoriesCard from './AccessoriesCard.jsx';
import FilterModal from './FilterModal.jsx'
import { sortDrawerActionCreator, getFilterArraysActionCreator } from '../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        accessories: state.accessoriesList,
        accessoriesColorsArray: state.accessoriesColorsArray,
        accessoriesBrandsArray: state.accessoriesBrandsArray,
        accessoriesSizesArray: state.accessoriesSizesArray,
        accessoriesSubtypesArray: state.accessoriesSubtypesArray,
    };
};

const AccessoriesDrawer = props => {

    const [ showFilterModal, setShowFilterModal ] = useState(false);
    const dispatch = useDispatch();
    const accessories = []; 
    const arrOfAccessories = props.accessories;
    const arrOfColors = props.accessoriesColorsArray;
    const arrOfBrands = props.accessoriesBrandsArray;
    const arrOfSizes = props.accessoriesSizesArray;
    const arrOfSubtypes = props.accessoriesSubtypesArray;
    
    useEffect(() => {
        getFilterArrays("accessories");
    }, [arrOfAccessories]);
    
    const getFilterArrays = (clothingType) => {
        dispatch(getFilterArraysActionCreator(clothingType));
    }

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
                        {/* <option value="subtype">Subtype</option> */}
                    </select>
                    <button className="show-filter-button" onClick={()=> setShowFilterModal(!showFilterModal)}>Filter:</button>
                {showFilterModal && 
                <FilterModal 
                clothingType={"accessories"}
                colorsArr={arrOfColors}
                brandsArr={arrOfBrands}
                sizesArr={arrOfSizes}
                subtypesArr={arrOfSubtypes}
                setShowFilterModal={setShowFilterModal}
                />}
                </div>
            <div className="yourClothing">
            {accessories}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (AccessoriesDrawer);