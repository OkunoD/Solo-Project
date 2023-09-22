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
    
    const [isSticky, setIsSticky] = useState(false);
    const [outfitName, setOutfitName] = useState('');
    
    const outfit = []; 
    const outfitArr = [props.wornHeadwear, props.wornTop, props.wornJacket, props.wornBottom, props.wornShoes, props.wornAccessory];
    
    
    useEffect(() => {
        const handleScroll = () => {
          const scrollThreshold = 20; 
          if (window.scrollY >= scrollThreshold) {
            setIsSticky(true);
          } else {
            setIsSticky(false);
          }
        };
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    const saveOutfit = () => {
        const outfitIds = [];
        for (let i=0; i<outfitArr.length; i++) {
            outfitIds.push(outfitArr[i].id)
        }

        const outfitData = {
            name: outfitName,
            outfit: outfitIds,
        }

        console.log({outfitData});
        console.log({outfitArr});
        console.log({outfitName});

        fetch('/api/outfits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(outfitData),
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
        // console.log('in outfit loop, currentItem is: ', currentItem);
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
        <div className={`sticky-outfit ${isSticky ? 'with-shadow' : ''}`}>
            <div className="clothingBox" data-testid="my-outfit-container">
                <div className="my-outfit">My Outfit</div>
                <div className="yourClothing" style={{marginBottom:"0px"}}>
                    {outfit}
                </div>
                <div className="outfit-submit">
                    <input style={{borderColor:"white",borderWidth:"0px"}} className="user-input-field" placeholder="Outfit Name" onChange={(e) => setOutfitName(e.target.value)} type="text" value={outfitName}></input>
                    <input type="submit" className="black-button" onClick={() => {
                        saveOutfit();
                    }} value="Save Outfit"/>
                </div>
            </div>
        </div>
    );
};




export default connect(mapStateToProps) (Outfit);