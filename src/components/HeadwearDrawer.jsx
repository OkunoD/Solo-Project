import React, { Component, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import HeadwearCard from './HeadwearCard.jsx';
import FilterModal from './FilterModal.jsx'
import { sortDrawerActionCreator, getFilterArraysActionCreator } from '../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        headwear: state.headwearList,
        headwearColorsArray: state.headwearColorsArray,
        headwearBrandsArray: state.headwearBrandsArray,
        headwearSizesArray: state.headwearSizesArray,
        headwearSubtypesArray: state.headwearSubtypesArray,
    };
};

const HeadwearDrawer = props => {
    
    const [ showFilterModal, setShowFilterModal ] = useState(false);
    const dispatch = useDispatch();
    const headwear = []; 
    const arrOfHeadwear = props.headwear;
    const arrOfColors = props.headwearColorsArray;
    const arrOfBrands = props.headwearBrandsArray;
    const arrOfSizes = props.headwearSizesArray;
    const arrOfSubtypes = props.headwearSubtypesArray;
    
    useEffect(() => {
        console.log("before getFilterArrays in useEffect");
        getFilterArrays("headwear");
        console.log("in useEffect", props.headwearColorsArray);
        // selectColorsDropdown();
    }, [arrOfHeadwear]);
    
    const getFilterArrays = (clothingType) => {
        dispatch(getFilterArraysActionCreator(clothingType));
    }

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
                    {/* <option value="subtype">Subtype</option> */}
                </select>
                <button className="show-filter-button" onClick={()=> setShowFilterModal(!showFilterModal)}>Filter:</button>
                {showFilterModal && 
                <FilterModal 
                clothingType={"headwear"}
                colorsArr={arrOfColors}
                brandsArr={arrOfBrands}
                sizesArr={arrOfSizes}
                subtypesArr={arrOfSubtypes}
                setShowFilterModal={setShowFilterModal}
                />}
                {/* <div>
                    {selectColorsDropdownArray}
                </div> */}
            </div>
            <div className="yourClothing">
            {headwear}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (HeadwearDrawer);