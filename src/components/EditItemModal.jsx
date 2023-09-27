import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { updateItemActionCreator } from '../actions/actions';

export const ItemEditorModal = ({ toggleEditModal, handleClick, itemId, itemList, currentName, currentType, currentBrand, currentColor, currentSize}) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [itemType, setType] = useState('');
  const [itemBrand, setBrand] = useState('');
  const [itemName, setName] = useState('');
  const [itemColor, setColor] = useState('');
  const [itemSize, setSize] = useState('');
  console.log(itemList);
  // Fetch the item data based on itemId from the server or Redux store.
//   useEffect(() => {
//     // Fetch the item data based on the itemId and populate the form fields.
//     const item = state[itemList].find((item) => item.id === itemId);
//     if (item) {
//         setType(item.type);
//         setBrand(item.brand);
//         setName(item.name);
//         setColor(item.color);
//         setSize(item.size);
//     }
//   }, [itemId]);

  const updateItem = () => {
    // Create an object with the updated data.
    const updatedItem = {
        type: itemType,
        brand: itemBrand,
        name: itemName,
        color: itemColor,
        size: itemSize,
    };

    // Dispatch the update action.
    dispatch(updateItemActionCreator(itemId, updatedItem));

    // Make an API request to update the item on the server.
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
        // Handle success or error as needed.
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error.
      });

    // Close the modal and trigger any necessary actions.
    // toggleModal();
    handleClick();
};

  return (
    <div className="edit-item-modal">
        {/* <div className="editItemHeaders">{currentName}</div> */}
      <div className="edit-item-borders">
      <button className="exit-edit-button" style={{float:"right"}}onClick={()=>toggleEditModal()}>X</button>
        <select className="edit-category-select-list" id="category-select-list" data-testid="category-select-list" onChange={(e) => setType(e.target.value)} value={currentType}>
         <option value="null">Category</option>
         <option value="headwear">Hat</option>
         <option value="tops">Top</option>
         <option value="jackets">Jacket</option>
         <option value="bottoms">Bottoms</option>
         <option value="shoes">Shoes</option>
         <option value="accessories">Accessory</option>
        </select>
        <div className="edit-item-input-div">
          <input className="edit-brand-field" placeholder={currentBrand} onChange={(e)=>setBrand(e.target.value)} type="text" value={itemBrand} />
        <select className="edit-size-select-list" placeholder={currentSize} id="size-select-list" data-testid="size-select-list" onChange={(e)=>setSize(e.target.value)} value={currentSize}>
         <option value="null">Size</option>
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
          <input className="edit-name-field" placeholder={currentName} onChange={(e) => setName(e.target.value)} type="text" value={itemName} />
        </div>
        <button className="update-item-button" onClick={() => {
            toggleEditModal();
        }}>UPDATE ITEM</button>


        {/* Render the same form fields as the creation component with values pre-populated. */}

        {/* Add onChange handlers to update the state when the user edits the fields. */}
        {/* Add a button to trigger the updateItem function. */}
        {/* Add a close button to close the modal. */}
      </div>
    </div>
  );
};

export default ItemEditorModal;
