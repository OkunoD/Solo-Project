import React, { Component, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import TopsCard from './TopsCard.jsx';
import FilterModal from './FilterModal.jsx'
import { sortDrawerActionCreator, getFilterArraysActionCreator } from '../actions/actions.js'


const mapStateToProps = (state) => {
    return {
        tops: state.topsList,
        topsColorsArray: state.topsColorsArray,
        topsBrandsArray: state.topsBrandsArray,
        topsSizesArray: state.topsSizesArray,
        topsSubtypesArray: state.topsSubtypesArray,
    };
};


const TopsDrawer = props => {
    
    const [ showFilterModal, setShowFilterModal ] = useState(false);
    const dispatch = useDispatch();
    const tops = []; 
    const arrOfTops = props.tops;
    const arrOfColors = props.topsColorsArray;
    const arrOfBrands = props.topsBrandsArray;
    const arrOfSizes = props.topsSizesArray;
    const arrOfSubtypes = props.topsSubtypesArray;
    
    useEffect(() => {
        console.log("before getFilterArrays in useEffect");
        getFilterArrays("tops");
        console.log("in useEffect", props.topsColorsArray);
        // selectColorsDropdown();
    }, [arrOfTops]);
    
    const getFilterArrays = (clothingType) => {
        dispatch(getFilterArraysActionCreator(clothingType));
    }

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
                <button className="show-filter-button" onClick={()=> setShowFilterModal(!showFilterModal)}>Filter:</button>
                {showFilterModal && 
                <FilterModal 
                clothingType={"tops"}
                colorsArr={arrOfColors}
                brandsArr={arrOfBrands}
                sizesArr={arrOfSizes}
                subtypesArr={arrOfSubtypes}
                setShowFilterModal={setShowFilterModal}
                />}
            </div>
            <div className="yourClothing">
            {tops}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (TopsDrawer);