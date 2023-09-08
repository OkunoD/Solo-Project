//components: HeadwearCard, TopsCard, etc...
//title of box: Your outfit

import React, { Component, useState, useEffect } from 'react';
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

    const [outfitName, setOutfitName] = useState('');

    const outfit = []; 
    const outfitArr = [props.wornHeadwear, props.wornTop, props.wornJacket, props.wornBottom, props.wornShoes, props.wornAccessory];
    
    const saveOutfit = () => {
        //should save outfit to database
        //needs to write outfit array to db, needs current item.id
        //
        const formData = new FormData();
        formData.append('name', outfitName)
        formData.append('outfit', outfitArr)
        fetch('/api/outfits', {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
                console.log("SAVE OUTFIT DATA IS: ", data);
            })
            .catch((error) => {
              console.error('Error:', error);
        });
    }

    for (let i = 0; i < outfitArr.length; i++) {
        const currentItem = outfitArr[i];
        console.log('in outfit loop, currentItem is: ', currentItem);
        // console.log('in outfit loop, currentItemName is: ', currentItem.name);
        // console.log('in outfit loop currentItemColor is: ', currentItem.color);
        // console.log('in outfit loop, currentOutfitImgUrl is: ', currentItem.imgUrl);

        currentItem.id ? 
        outfit.push(
            <ItemCard
                key={i}
                id={currentItem.id}
                name={currentItem.name}
                color={currentItem.color}
                file={currentItem.file}
                contentType={currentItem.contentType}
                // index = {i}
            />) 
            : outfit.push(<div key={i}></div>);
    }
    return(
        <div className="clothingBox">
            <div className="categoryHeaders">My Outfit</div>
            <div className="yourClothing">
                {outfit}
            </div>
            <input classname="user-input-field" placeholder="Outfit Name" onChange={(e)=>setOutfitName(e.target.value)} type="text" value={outfitName}></input>
            <button type="submit" class="black-button" onClick={() => {
                saveOutfit();
            }}>Save Outfit</button>
        </div>
    );
};




export default connect(mapStateToProps) (Outfit);