import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateItemActionCreator, openAlert } from '../actions/actions';

export const ItemEditorModal = ({ toggleEditModal, handleClick, itemId, itemList, currentName, currentType, currentBrand, currentColor, currentSize}) => {
  const dispatch = useDispatch();
//   const state = useSelector((state) => state);
  const [newType, setNewType] = useState(currentType);
  const [newBrand, setNewBrand] = useState(currentBrand);
  const [newName, setNewName] = useState(currentName);
  const [newColor, setNewColor] = useState(currentColor);
  const [newSize, setNewSize] = useState(currentSize);

  const updateItemState = (itemId, itemList, updatedItem) => {
    dispatch(updateItemActionCreator(itemId, itemList, updatedItem));
  }

  const updateItem = () => {
    // Create an object with the updated data.
    const updatedItem = {
        type: newType,
        brand: newBrand,
        name: newName,
        color: newColor,
        size: newSize,
    };
    console.log('itemList is: ', itemList);
    console.log("itemId in updateItem function is: ", itemId);
    console.log("updatedItem in updateItem function is: ", updatedItem);

    updateItemState(itemId, itemList, updatedItem);

    fetch(`/api/items/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(openAlert(data.message, "green"));
     })
      .catch((error) => {
        console.error('Error:', error);
      });
};

  return (
    <div className="edit-item-modal">
      <div className="edit-item-borders">
      <button className="exit-edit-button" style={{float:"right"}}onClick={()=>toggleEditModal()}>X</button>
        <select className="edit-category-select-list" id="category-select-list" data-testid="category-select-list" onChange={(e) => setNewType(e.target.value)} value={newType}>
         <option value="null">Category</option>
         <option value="headwear">Hat</option>
         <option value="tops">Top</option>
         <option value="jackets">Jacket</option>
         <option value="bottoms">Bottoms</option>
         <option value="shoes">Shoes</option>
         <option value="accessories">Accessory</option>
        </select>
        <select className="edit-color-select-list" id="color-select-list" data-testid="color-select-list" onChange={(e)=>setNewColor(e.target.value)} value={newColor}>
         <option value="null">Color</option>
         <option value="White">White</option>
         <option value="Black">Black</option>
         <option value="Grey">Grey</option>
         <option value="Navy">Navy</option>
         <option value="Blue">Blue</option>
         <option value="Light Blue">Light Blue</option>
         <option value="Purple">Purple</option>
         <option value="Red">Red</option>
         <option value="Green">Green</option>
         <option value="Yellow">Yellow</option>
         <option value="Orange">Orange</option>
         <option value="Brown">Brown</option>
         <option value="Tan">Tan</option>
         <option value="Cream">Cream</option>
         <option value="Gold">Gold</option>
         <option value="Silver">Silver</option>
         <option value="Camo">Camo</option>
         <option value="New Color">New Color</option>
        </select>
        <div className="edit-item-input-div">
          <input className="edit-brand-field" placeholder={currentBrand} onChange={(e)=>setNewBrand(e.target.value)} type="text" value={newBrand} />
        <select className="edit-size-select-list" placeholder={currentSize} id="size-select-list" data-testid="size-select-list" onChange={(e)=>setNewSize(e.target.value)} value={newSize}>
         <option value="No Size">Size</option>
         <option value="XS">XS</option>
         <option value="S">S</option>
         <option value="M">M</option>
         <option value="L">L</option>
         <option value="XL">XL</option>
         <option value="6">6</option>
         <option value="7">7</option>
         <option value="8">8</option>
         <option value="9">9</option>
         <option value="10">10</option>
         <option value="11">11</option>
         <option value="12">12</option>
         <option value="13">13</option>
        </select>
        </div>
        <div>
          <input className="edit-name-field" placeholder={currentName} onChange={(e) => setNewName(e.target.value)} type="text" value={newName} />
        </div>
        <button className="update-item-button" onClick={() => {
            console.log("itemId is: ", itemId);
            console.log("newName is: ", newName);
            console.log("newBrand is", newBrand);
            console.log("newSize is: ", newSize);
            console.log("newColor is", newColor);
            console.log("newType is", newType);

            updateItem();
            
            toggleEditModal();
        }}>UPDATE ITEM</button>
      </div>
    </div>
  );
};

export default ItemEditorModal;
