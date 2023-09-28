import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import ItemCard from '../components/ItemCard.jsx'
import Header from '../components/Header.jsx';
import { mockOutfits } from '../../mockData.js';
import { openAlert, closeAlert } from '../actions/actions.js';


const mapDispatchToProps = (dispatch) => ({
    openAlert : (message, color)  => dispatch(openAlert(message, color)),
    closeAlert : ()  => dispatch(closeAlert()),
});
  
const OutfitContainer = (props) => {

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

    const toggleAlert = (message, color) => {
        console.log('inside toggleAlert, message is', message);
        props.openAlert(message, color);
        // setTimeout(() => props.closeAlert(), 3000);
      }

    const deleteOutfit = async (outfit_id) => {
    try {
        const response = await fetch(`/api/outfits/${outfit_id}`, {
            method: "DELETE",
        });
        if (response.status === 200) {
            const data = await response.json();
            console.log('inside deleteOutfit, data.message is: ',data.message);
            toggleAlert(data.message, "red");
        } else {
            throw new Error('Error deleting outfit');
        }
        } catch(error) {
        console.error('Error deleting outfit:', error);
        }
    }

    console.log({outfitRefs})
    //outfitRefs = Array [{name:"winter fit", outfit: []}, {name:"random", outfit:[]}]

    const fitsList = (
        <>
            <div className="clothingBox">
                {outfitRefs.map((outfitRef, index) => {
                    const currentOutfit = [];
                    let foundObject = {};
                    // <div>{outfitRefs["name"]}</div>
            
                    for (let i=0;i<outfitRef.outfit.length;i++) {
                        for (const key in state) {
                            const value = state[key];
                            if (Array.isArray(value)) {
                                foundObject = state[key].find((obj) => obj.id === outfitRef.outfit[i]);
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
                                    brand={foundObject.brand}
                                    size={foundObject.size}
                                    color={foundObject.color}
                                    file={foundObject.file}
                                    contentType={foundObject.contentType}
                                    hideButton={true}
                                />)
                            }
                        }

                    return (
                        <div key={index} className="outfit-container" data-testid={`outfit-container-${index}`}>
                            <p></p>
                            <div className="outfit-name-and-delete">
                                <div className="outfit-names">{outfitRef.name}</div>
                                <button className="delete-item-button" data-testid={`delete-outfit-button-${index}`} onClick={()=>{
                                    deleteOutfit(outfitRef._id);
                                    outfitRefs.splice(index, 1);
                                    }}>delete outfit</button>
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
        <Header view={"myOutfits"}/>
            <div>
                {fitsList}
            </div>
    </div>
  );
}

  export default connect(null, mapDispatchToProps)(OutfitContainer);