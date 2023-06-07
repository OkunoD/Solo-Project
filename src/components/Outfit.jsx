//components: HeadwearCard, TopsCard, etc...
//title of box: Your outfit

import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import JacketsCard from './JacketsCard.jsx';
import ItemCard from './ItemCard.jsx';

const mapStateToProps = (state) => {
    return {
        wornHeadwear: state.wornHeadwear,
        wornTop: state.wornTop,
        wornJacket: state.wornJacket,
        wornBottom: state.wornBottom,
        wornShoes: state.wornShoes,
        wornAccessory: state.wornAccessory,
    };
};


const Outfit = props => {
    
    const outfit = []; 
    const outfitArr = [props.wornHeadwear, props.wornTop, props.wornJacket, props.wornBottom, props.wornShoes, props.wornAccessory];
    console.log(outfitArr);
    console.log('outfitID is: ', outfitArr[1].id);
    console.log('outfitName is: ', outfitArr[1].name);

    for (let i = 0; i < outfitArr.length; i++) {
        const currentItem = outfitArr[i];
        console.log('in loop, currentItemId is: ', currentItem.id);
        console.log('in loop, currentItemName is: ', currentItem.name);
        outfit.push(
            <ItemCard
                key = {i}
                itemId={currentItem.id}
                itemName={currentItem.name}
                itemColor={currentItem.color}
                imgUrl={currentItem.imgUrl}
                index = {i}
            />);
    }
    return(
        <div className="clothingBox">
            <div className="categoryHeaders">Your Outfit</div>
            <div className="yourClothing">
            {outfit}
            </div>
        </div>
    );
};


export default connect(mapStateToProps) (Outfit);