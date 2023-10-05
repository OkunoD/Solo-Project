import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import JacketsCard from './JacketsCard.jsx';
import ItemCard from './ItemCard.jsx';
import { mockWeather } from '../../mockData.js';
import { WeatherModal } from './WeatherModal.jsx';
import { 
    openAlert, 
    closeAlert, 
    randomizeOutfitActionCreator, 
    clearOutfitActionCreator,
    lockItemActionCreator
 } from '../actions/actions.js'


const mapStateToProps = (state) => {
    return {
        wornHeadwear: state.wornHeadwear,
        wornTop: state.wornTops,
        wornJacket: state.wornJackets,
        wornBottom: state.wornBottoms,
        wornShoes: state.wornShoes,
        wornAccessory: state.wornAccessories,
        refresh: state.refresh,
        wornHeadwearLocked: state.wornHeadwearLocked,
        wornTopsLocked: state.wornTopsLocked,
        wornJacketsLocked: state.wornJacketsLocked,
        wornBottomsLocked: state.wornBottomsLocked,
        wornShoesLocked: state.wornShoesLocked,
        wornAccessoriesLocked: state.wornAccessoriesLocked,
    };
};

const mapDispatchToProps = (dispatch) => ({
    openAlert : (message, color)  => dispatch(openAlert(message, color)),
    closeAlert : ()  => dispatch(closeAlert()),
    randomizeOutfit : () => dispatch(randomizeOutfitActionCreator()),
    clearOutfit : () => dispatch(clearOutfitActionCreator()),
    lockItem: (wornItemType) => dispatch(lockItemActionCreator(wornItemType)),
  });

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

    const toggleAlert = (message, color) => {
        console.log('inside toggleAlert, message is', message);
        props.openAlert(message, color);
    }

    const saveOutfit = () => {
        const outfitIds = [];
        const getOutfitIds = (outfitArr) => {
            for (let i=0; i<outfitArr.length; i++) {
                if (Array.isArray(outfitArr[i])) {
                    getOutfitIds(outfitArr[i]);
                }
                outfitIds.push(outfitArr[i].id)
            }
        }
        getOutfitIds(outfitArr);

        const outfitData = {
            name: outfitName,
            outfit: outfitIds,
        }

        // console.log({outfitData});
        // console.log({outfitArr});
        // console.log({outfitName});

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
                toggleAlert(data.message, "green");
            })
            .catch((error) => {
              console.error('Error:', error);
        });
    }

    const fillOutfit = (outfitArr) => {
        for (let i = 0; i < outfitArr.length; i++) {
            if (Array.isArray(outfitArr[i])) {
                console.log('inside filloutfit Array.isArray conditional');
                fillOutfit(outfitArr[i]);
            }
            if (!Array.isArray(outfitArr[i])) {
                const currentItem = outfitArr[i];
                // console.log('in outfit loop, currentItem is: ', currentItem);
                // console.log('in outfit loop, currentItemName is: ', currentItem.name);
                // console.log('in outfit loop, currentItemBrand is: ', currentItem.brand);
                // console.log('in outfit loop, currentItemSize is: ', currentItem.size);
                // console.log('in outfit loop currentItemColor is: ', currentItem.color);
                currentItem.id ? 
                outfit.push(
                    <ItemCard
                        key={currentItem.id}
                        id={currentItem.id}
                        name={currentItem.name}
                        color={currentItem.color}
                        file={currentItem.file}
                        contentType={currentItem.contentType}
                        brand={currentItem.brand}
                        size={currentItem.size}
                        type={currentItem.type}
                    />) 
                    : outfit.push(<div key={i + 10000}></div>);
            }
        }
    }
    fillOutfit(outfitArr);

    return(
        <div className={`sticky-outfit ${isSticky ? 'with-shadow' : ''}`}>
            <div className="clothingBox" data-testid="my-outfit-container">
                <div className="my-outfit-header">
                    <div className="my-outfit">My Outfit</div>
                    <button className="randomize-outfit-button"
                    onClick={()=>{
                        console.log('clicked randomize outfit')
                        props.randomizeOutfit();
                    }}
                    >RANDOMIZE</button>
                    {/* <button className="clear-outfit-button"
                    onClick={()=>{
                        console.log('clicked clear outfit')
                        props.clearOutfit();
                    }}
                    >CLEAR OUTFIT</button> */}
                <div className="lock-item-div">
                    <div className="lock-emoji">
                        <span>&#128274;</span>
                    </div>
                    <div className="lock-item-buttons-div">
                        <button className={props.wornHeadwearLocked ? "locked-item-button" : "unlocked-item-button"} 
                        onClick={()=>props.lockItem('wornHeadwearLocked')}
                        >{props.wornHeadwearLocked ? <span>headwear</span> : <span>headwear</span>}</button>
                        <span className="divider-span">|</span>
                        <button className={props.wornTopsLocked ? "locked-item-button" : "unlocked-item-button"} onClick={()=>props.lockItem('wornTopsLocked')}>tops</button>
                        <span className="divider-span">|</span>
                        <button className={props.wornJacketsLocked ? "locked-item-button" : "unlocked-item-button"} onClick={()=>props.lockItem('wornJacketsLocked')}>jackets</button>
                        <span className="divider-span">|</span>
                        <button className={props.wornBottomsLocked ? "locked-item-button" : "unlocked-item-button"} onClick={()=>props.lockItem('wornBottomsLocked')}>bottoms</button>
                        <span className="divider-span">|</span>
                        <button className={props.wornShoesLocked ? "locked-item-button" : "unlocked-item-button"} onClick={()=>props.lockItem('wornShoesLocked')}>shoes</button>
                        <span className="divider-span">|</span>
                        <button className={props.wornAccessoriesLocked ? "locked-item-button" : "unlocked-item-button"} onClick={()=>props.lockItem('wornAccessoriesLocked')}>accessories</button>
                        <span className="divider-span">|</span>
                        <button className="clear-outfit-button-small"
                    onClick={()=>{
                        console.log('clicked clear outfit')
                        props.clearOutfit();
                    }}
                    >CLEAR OUTFIT</button>
                    </div>
                </div>
                </div>
                <div className="yourClothing" style={{marginBottom:"0px"}}>
                    {outfit}
                </div>
                <div className="outfit-and-weather-border"></div>
                <div className="outfit-footer">
                <div className="outfit-submit">
                    <input style={{borderColor:"white",borderWidth:"0px"}} className="user-input-field" placeholder="Outfit Name" onChange={(e) => setOutfitName(e.target.value)} type="text" value={outfitName}></input>
                    <input type="submit" className="black-button" onClick={() => {
                        saveOutfit();
                    }} value="Save Outfit"/>
                </div>
                
                </div>
            </div>
        </div>
    );
};




export default connect(mapStateToProps, mapDispatchToProps) (Outfit);