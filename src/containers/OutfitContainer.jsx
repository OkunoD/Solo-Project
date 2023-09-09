import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

// import WardrobeReducer from '../components/WardrobeReducer.js';

import Outfit from '../components/Outfit';
import Dispatch from 'react';

const mapStateToProps = state => ({  
});
  
const OutfitContainer = () => {

    //fetch outfits from db (outfits have {name: string, outfit: array of ids})
    //use outfit array to fetch entire items from state to then fill an outfit card

    const state = useSelector((state) => state);

    const [outfits, setOutfits] = useState([]);

    console.log("state in outfitcontainer is: ", state);


    useEffect(() => {
        fetch('/api/outfits')
        .then((response) => {
            console.log('outfits fetch response is: ', response);
            return response.json();
        })
        .then((data) => {
            console.log('data is: ', data);
            setOutfits(data);
        }).catch((error) => {
            console.log('Error fetching outfits:', error);
        });
    }, []);


  return(
    <div className="outfit-container">
      <div className="outerBox">
        <div className="header"><strong>&nbsp;&nbsp;MY OUTFITS</strong></div>
        <div>
            {outfits.map((outfit, index) => (
                <div key={index} className="outfit-text">
                    <strong>Outfit Name:</strong> {outfit.name}
                    <br />
                    <strong>Outfit Items:</strong> {outfit.outfit.join(', ')}
                </div>
            ))}
            </div>
        </div>
    </div>
  );
}

  export default connect(mapStateToProps, null)(OutfitContainer);