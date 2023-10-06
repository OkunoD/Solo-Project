import React, { Component, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import UnderwearCard from './UnderwearCard.jsx';
import FilterModal from './FilterModal.jsx'
import { sortDrawerActionCreator, getFilterArraysActionCreator } from '../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        underwear: state.underwearList,
        underwearColorsArray: state.underwearColorsArray,
        underwearBrandsArray: state.underwearBrandsArray,
        underwearSizesArray: state.underwearSizesArray,
        underwearSubtypesArray: state.underwearSubtypesArray,
    };
};

const UnderwearDrawer = props => {
    
    const [ showFilterModal, setShowFilterModal ] = useState(false);
    const [ isClicked, setIsClicked ] = useState(false);

    const dispatch = useDispatch();
    const underwear = []; 
    const arrOfunderwear = props.underwear;
    const arrOfColors = props.underwearColorsArray;
    const arrOfBrands = props.underwearBrandsArray;
    const arrOfSizes = props.underwearSizesArray;
    const arrOfSubtypes = props.underwearSubtypesArray;
    
    useEffect(() => {
        getFilterArrays("underwear");
    }, [arrOfunderwear]);
    
    const getFilterArrays = (clothingType) => {
        dispatch(getFilterArraysActionCreator(clothingType));
    }

    const sortDrawer = (clothingType, property) => {
        dispatch(sortDrawerActionCreator(clothingType, property));
    }

    for (let i = 0; i < arrOfunderwear.length; i++) {
        const currentunderwear = arrOfunderwear[i];
        underwear.push(
            <UnderwearCard
                key = {currentunderwear.id}
                underwearName={currentunderwear.name}
                underwearId={currentunderwear.id}
                underwearColor={currentunderwear.color}
                imgUrl={currentunderwear.imgUrl}
                index = {i}
            />);
    }
    return(
        <div className="clothingBox" data-testid="underwear-drawer">
            <div className="categoryHeaders">Underwear
            <p className="drawer-filters">sort by:</p>
                <select className="sort-by-select-list" data-testid="sort-by-select-list" onChange={(e)=>sortDrawer("underwear", e.target.value)}>
                    <option value="color">Color</option>
                    <option value="brand">Brand</option>
                    <option value="size">Size</option>
                    {/* <option value="subtype">Subtype</option> */}
                </select>
                <button className={isClicked ? "clicked-filter-button" : "show-filter-button"} onClick={()=> {setShowFilterModal(!showFilterModal);setIsClicked(!isClicked);}}>Filter:</button>
                {showFilterModal && 
                <FilterModal 
                clothingType={"underwear"}
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
            {underwear}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (UnderwearDrawer);