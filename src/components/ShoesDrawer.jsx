import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import ShoesCard from './ShoesCard.jsx';
import ItemCreator from './ItemCreatorModal.jsx';//change to itemCreator
import { addShoesActionCreator, deleteShoesActionCreator } from '../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        shoes: state.shoesList
    };
};


const ShoesDrawer = props => {
    const shoes = []; 
    const arrOfShoes = props.shoes;
    for (let i = 0; i < arrOfShoes.length; i++) {
        const currentShoes = arrOfShoes[i];
        shoes.push(
            <ShoesCard
                key = {i}
                shoesName={currentShoes.name}
                shoesId={currentShoes.id}
                shoesColor={currentShoes.color}
                imgUrl={currentShoes.imgUrl}
                index = {i}
            />);
    }
    return(
        <div className="clothingBox">
            <div className="categoryHeaders">Shoes</div>
            <div className="yourClothing">
            {shoes}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (ShoesDrawer);