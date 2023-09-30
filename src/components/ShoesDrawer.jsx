import React, { Component } from 'react';
import { connect, useDispatch } from 'react-redux';
import ShoesCard from './ShoesCard.jsx';
import { sortDrawerActionCreator } from '../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        shoes: state.shoesList
    };
};


const ShoesDrawer = props => {

    const shoes = []; 
    const arrOfShoes = props.shoes;
    const dispatch = useDispatch();

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
                </div>
            <div className="yourClothing">
            {shoes}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (ShoesDrawer);