import React, { Component, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import BottomsCard from './BottomsCard.jsx';
import FilterModal from './FilterModal.jsx'
import { sortDrawerActionCreator, getFilterArraysActionCreator } from '../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        bottoms: state.bottomsList,
        bottomsColorsArray: state.bottomsColorsArray,
        bottomsBrandsArray: state.bottomsBrandsArray,
        bottomsSizesArray: state.bottomsSizesArray,
        bottomsSubtypesArray: state.bottomsSubtypesArray,
    };
};


const BottomsDrawer = props => {

    const [ showFilterModal, setShowFilterModal ] = useState(false);
    const dispatch = useDispatch();
    const bottoms = []; 
    const arrOfBottoms = props.bottoms;
    const arrOfColors = props.bottomsColorsArray;
    const arrOfBrands = props.bottomsBrandsArray;
    const arrOfSizes = props.bottomsSizesArray;
    const arrOfSubtypes = props.bottomsSubtypesArray;
    
    useEffect(() => {
        console.log("before getFilterArrays in useEffect");
        getFilterArrays("bottoms");
        console.log("in useEffect", props.bottomsColorsArray);
        // selectColorsDropdown();
    }, [arrOfBottoms]);
    
    const getFilterArrays = (clothingType) => {
        dispatch(getFilterArraysActionCreator(clothingType));
    }

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
                <button className="show-filter-button" onClick={()=> setShowFilterModal(!showFilterModal)}>Filter:</button>
                {showFilterModal && 
                <FilterModal 
                clothingType={"bottoms"}
                colorsArr={arrOfColors}
                brandsArr={arrOfBrands}
                sizesArr={arrOfSizes}
                subtypesArr={arrOfSubtypes}
                setShowFilterModal={setShowFilterModal}
                />}
                </div>
            <div className="yourClothing">
            {bottoms}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (BottomsDrawer);