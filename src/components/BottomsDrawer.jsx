import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import BottomsCard from './BottomsCard.jsx';
import ItemCreator from './ItemCreator';//change to itemCreator
import { addBottomActionCreator, deleteBottomActionCreator } from '../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        bottoms: state.bottomsList
    };
};


const BottomsDrawer = props => {
    const bottoms = []; 
    const arrOfBottoms = props.bottoms;
    for (let i = 0; i < arrOfBottoms.length; i++) {
        const currentBottom = arrOfBottoms[i];
        bottoms.push(
            <BottomsCard
                key = {i}
                bottomName={currentBottom.name}
                bottomId={currentBottom.id}
                bottomColor={currentBottom.color}
                imgUrl={currentBottom.imgUrl}
                index = {i}
            />);
    }
    return(
        <div className="clothingBox">
            <div className="categoryHeaders">Bottoms</div>
            <div className="yourClothing">
            {bottoms}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (BottomsDrawer);