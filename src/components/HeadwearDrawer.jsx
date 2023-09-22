import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import HeadwearCard from './HeadwearCard.jsx';
import HeadwearCreator from './ItemCreatorModal.jsx';
import { addHeadwearctionCreator, deleteHeadwearActionCreator } from '../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        headwear: state.headwearList
    };
};


const HeadwearDrawer = props => {
    const headwear = []; 
    const arrOfHeadwear = props.headwear;
    for (let i = 0; i < arrOfHeadwear.length; i++) {
        const currentHeadwear = arrOfHeadwear[i];
        headwear.push(
            <HeadwearCard
                key = {i}
                headwearName={currentHeadwear.name}
                headwearId={currentHeadwear.id}
                headwearColor={currentHeadwear.color}
                imgUrl={currentHeadwear.imgUrl}
                index = {i}
            />);
    }
    return(
        <div className="clothingBox" data-testid="headwear-drawer">
            <div className="categoryHeaders">Headwear</div>
            <div className="yourClothing">
            {headwear}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (HeadwearDrawer);