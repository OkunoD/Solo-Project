import React, { Component, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import JacketsCard from './JacketsCard.jsx';
import FilterModal from './FilterModal.jsx'
import { sortDrawerActionCreator , getFilterArraysActionCreator} from '../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        jackets: state.jacketsList,
        jacketsColorsArray: state.jacketsColorsArray,
        jacketsBrandsArray: state.jacketsBrandsArray,
        jacketsSizesArray: state.jacketsSizesArray,
        jacketsSubtypesArray: state.jacketsSubtypesArray,
    };
};


const JacketsDrawer = props => {

    const [ showFilterModal, setShowFilterModal ] = useState(false);
    const dispatch = useDispatch();
    const jackets = []; 
    const arrOfJackets = props.jackets;
    const arrOfColors = props.jacketsColorsArray;
    const arrOfBrands = props.jacketsBrandsArray;
    const arrOfSizes = props.jacketsSizesArray;
    const arrOfSubtypes = props.jacketsSubtypesArray;
    
    useEffect(() => {
        console.log("before getFilterArrays in useEffect");
        getFilterArrays("jackets");
        console.log("in useEffect", props.jacketsColorsArray);
        // selectColorsDropdown();
    }, [arrOfJackets]);
    
    const getFilterArrays = (clothingType) => {
        dispatch(getFilterArraysActionCreator(clothingType));
    }

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
                    <button className="show-filter-button" onClick={()=> setShowFilterModal(!showFilterModal)}>Filter:</button>
                {showFilterModal && 
                <FilterModal 
                clothingType={"jackets"}
                colorsArr={arrOfColors}
                brandsArr={arrOfBrands}
                sizesArr={arrOfSizes}
                subtypesArr={arrOfSubtypes}
                setShowFilterModal={setShowFilterModal}
                />}
            </div>
            <div className="yourClothing">
            {jackets}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (JacketsDrawer);