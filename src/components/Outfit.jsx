import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import JacketsCard from './JacketsCard.jsx';
import ItemCard from './ItemCard.jsx';
import { openAlert, closeAlert } from '../actions/actions.js'


const mapStateToProps = (state) => {
    return {
        wornHeadwear: state.wornHeadwear,
        wornTop: state.wornTops,
        wornJacket: state.wornJackets,
        wornBottom: state.wornBottoms,
        wornShoes: state.wornShoes,
        wornAccessory: state.wornAccessories,
        refresh: state.refresh,
    };
};

const mapDispatchToProps = (dispatch) => ({
    openAlert : (payload)  => dispatch(openAlert(payload)),
    closeAlert : ()  => dispatch(closeAlert()),
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

    const toggleAlert = (message) => {
        console.log('inside toggleAlert, message is', message);
        props.openAlert(message);
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

        // for (let i=0; i<outfitArr.length; i++) {
        //     outfitIds.push(outfitArr[i].id)
        // }

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
                toggleAlert(data.message);
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
            const currentItem = outfitArr[i];
    
            console.log('in outfit loop, currentItem is: ', currentItem);
            console.log('in outfit loop, currentItemName is: ', currentItem.name);
            console.log('in outfit loop currentItemColor is: ', currentItem.color);
    
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
                    // index = {i}
                />) 
                : outfit.push(<div key={i + 10000}></div>);
        }
    }
    fillOutfit(outfitArr);

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




export default connect(mapStateToProps, mapDispatchToProps) (Outfit);