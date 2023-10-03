import React, { Component, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import ShoesCard from './ShoesCard.jsx';
import FilterModal from './FilterModal.jsx'
import { sortDrawerActionCreator, getFilterArraysActionCreator } from '../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        shoes: state.shoesList,
        shoesColorsArray: state.shoesColorsArray,
        shoesBrandsArray: state.shoesBrandsArray,
        shoesSizesArray: state.shoesSizesArray,
        shoesSubtypesArray: state.shoesSubtypesArray,
    };
};


const ShoesDrawer = props => {

    const [ showFilterModal, setShowFilterModal ] = useState(false);
    const dispatch = useDispatch();
    const shoes = []; 
    const arrOfShoes = props.shoes;
    const arrOfColors = props.shoesColorsArray;
    const arrOfBrands = props.shoesBrandsArray;
    const arrOfSizes = props.shoesSizesArray;
    const arrOfSubtypes = props.shoesSubtypesArray;
    
    useEffect(() => {
        console.log("before getFilterArrays in useEffect");
        getFilterArrays("shoes");
    }, [arrOfShoes]);
    
    const getFilterArrays = (clothingType) => {
        dispatch(getFilterArraysActionCreator(clothingType));
    }

    const sortDrawer = (clothingType, property) => {
        dispatch(sortDrawerActionCreator(clothingType, property));
    }

    for (let i = 0; i < arrOfShoes.length; i++) {
        const currentShoes = arrOfShoes[i];
        shoes.push(
            <ShoesCard
                key = {currentShoes.id}
                shoesName={currentShoes.name}
                shoesId={currentShoes.id}
                shoesColor={currentShoes.color}
                imgUrl={currentShoes.imgUrl}
                index = {i}
            />);
    }
    return(
        <div className="clothingBox" data-testid="shoes-drawer">
            <div className="categoryHeaders">Shoes
                <p className="drawer-filters">sort by:</p>
                    <select className="sort-by-select-list" data-testid="sort-by-select-list" onChange={(e)=>sortDrawer("shoes", e.target.value)}>
                        <option value="color">Color</option>
                        <option value="brand">Brand</option>
                        <option value="size">Size</option>
                        {/* <option value="subtype">Subtype</option> */}
                    </select>
                    <button className="show-filter-button" onClick={()=> setShowFilterModal(!showFilterModal)}>Filter:</button>
                {showFilterModal && 
                <FilterModal 
                clothingType={"shoes"}
                colorsArr={arrOfColors}
                brandsArr={arrOfBrands}
                sizesArr={arrOfSizes}
                subtypesArr={arrOfSubtypes}
                setShowFilterModal={setShowFilterModal}
                />}
                </div>
            <div className="yourClothing">
            {shoes}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (ShoesDrawer);