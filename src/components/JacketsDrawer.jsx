import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import JacketsCard from './JacketsCard.jsx';
import HeadwearCreator from './ItemCreator';//change to itemCreator
import { addJacketActionCreator, deleteJacketActionCreator } from '../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        jackets: state.jacketsList
    };
};


const JacketsDrawer = props => {
    const jackets = []; 
    const arrOfJackets = props.jackets;
    for (let i = 0; i < arrOfJackets.length; i++) {
        const currentJacket = arrOfJackets[i];
        jackets.push(
            <JacketsCard
                key = {i}
                jacketName={currentJacket.name}
                jacketId={currentJacket.id}
                jacketColor={currentJacket.color}
                imgUrl={currentJacket.imgUrl}
                index = {i}
            />);
    }
    return(
        <div className="clothingBox">
            <div className="categoryHeaders">Your Jackets</div>
            <div className="yourClothing">
            {jackets}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (JacketsDrawer);