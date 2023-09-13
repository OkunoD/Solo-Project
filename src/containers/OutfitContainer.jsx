import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import ItemCard from '../components/ItemCard.jsx'
import { mockOutfits } from '../../server/mockData.js';

// import WardrobeReducer from '../components/WardrobeReducer.js';

import Outfit from '../components/Outfit';
import Dispatch from 'react';

const mapStateToProps = state => ({  
});
  
const OutfitContainer = () => {

    //fetch outfits from db (outfits have {name: string, outfit: array of ids})
    //use outfit array to fetch entire items from state to then fill an outfit card

    const state = useSelector((state) => state);
    const [outfitRefs, setOutfitRefs] = useState([]);

    const outfit = [];

    console.log("state in outfitcontainer is: ", state);

    useEffect(() => {
        if (process.env.NODE_ENV==='development') {
            console.log('in Dev mode!!')
            console.log({mockOutfits});
            setOutfitRefs(mockOutfits);
            console.log("outfitRefs is this!!!!: ", outfitRefs);
        } else {
            fetch('/api/outfits')
            .then((response) => {
                console.log('outfits fetch response is: ', response);
                return response.json();
            })
            .then((data) => {
                console.log('data is: ', data);
                setOutfitRefs(data);
                console.log("outfitRefs is this!!!!: ", outfitRefs);
            }).catch((error) => {
                console.log('Error fetching outfits:', error);
            });
        }
    }, []);

    console.log({outfitRefs})
    //outfitRefs = Array [{name:"winter fit", outfit: []}, {name:"random", outfit:[]}]

    const fitsList = (
        <>
            <div className="clothingBox">
                {outfitRefs.map((outfitRefs, index) => {
                    const currentOutfit = [];
                    let foundObject = {};
                    // <div>{outfitRefs["name"]}</div>
            
                    for (let i=0;i<outfitRefs.outfit.length;i++) {
                        for (const key in state) {
                            const value = state[key];
                            if (Array.isArray(value)) {
                                foundObject = state[key].find((obj) => obj.id === outfitRefs.outfit[i]);
                                if (foundObject) {
                                    break; // If found, exit the loop
                                }
                            }
                        }
                        // console.log('foundObject is: ', foundObject);
                        // console.log('about to push to fits')

                        if (foundObject && foundObject.id) {
                            currentOutfit.push(
                                <ItemCard
                                    key={foundObject.id}
                                    id={foundObject.id}
                                    name={foundObject.name}
                                    color={foundObject.color}
                                    file={foundObject.file}
                                    contentType={foundObject.contentType}
                                />)
                            }
                        }

                    return (
                        <div key={index}>
                            <p></p>
                            <div className="outfit-name-and-delete">
                                <div className="outfit-names">{outfitRefs.name}</div>
                                <button className="delete-item-button">delete outfit</button>
                            </div>
                            <div className="yourClothing">{currentOutfit}</div>
                        </div>
                    )
                    }
                )
                }
            
            </div>
        </>
    )
    
  return(
    <div className="outfit-container">
        <div className="header"><strong>MY OUTFITS</strong></div>
            <div>
                {fitsList}
            </div>
    </div>
  );
}

  export default connect(mapStateToProps, null)(OutfitContainer);