import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItemActionCreator, fillWardrobeActionCreator } from '../actions/actions';
// import { connect } from 'react-redux';
import { mockData } from '../../server/mockData';

export const ItemCreatorModal = ({toggleModal, handleClick}) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);
  const [itemType, setType] = useState('');
  const [itemName, setName] = useState('');
  const [itemColor, setColor] = useState('');

  const addItem = (payload1, payload2, payload3, payload4) => {
    dispatch(addItemActionCreator(payload1,payload2,payload3,payload4));
  }
  
  const handleCategorySelect = (e) => {
    setType(e.target.value);
  };

  const handleColorSelect = (e) => {
    setColor(e.target.value);
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  }

  return (
    <div className="add-item-modal">
      <div className="addItemHeaders">ADD PIECE</div>
      <div className="addItemBorders">
        <div>
        <select className="select-list" id="select-list" onChange={handleCategorySelect} value={itemType}>
         <option value="null">Category</option>
         <option value="headwear">Hat</option>
         <option value="tops">Top</option>
         <option value="jackets">Jacket</option>
         <option value="bottoms">Bottom</option>
         <option value="shoes">Shoes</option>
         <option value="accessories">Accessory</option>
        </select>
        <select className="select-list" id="select-list" onChange={handleColorSelect} value={itemColor}>
         <option value="null">Color</option>
         <option value="White">White</option>
         <option value="Black">Black</option>
         <option value="Grey">Grey</option>
         <option value="Navy">Navy</option>
         <option value="Blue">Blue</option>
         <option value="Light Blue">Light Blue</option>
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
        </div>
        <div>
          <input className="user-input-field" placeholder="Name" onChange={(e) => setName(e.target.value)} type="text" value={itemName} />
        </div>
        <div>
          <input className="file-input" id="getFile" type="file" placeholder="Item Name" accept="image/*" onChange={handleFileChange} />
        </div>
        <div className="add-item-buttons-container">
          <input style={{padding: '3px'}} className="green-button" onClick={() => {
            // props.addItem(itemType, itemName, selectedFile, itemColor);
            addItem(itemType, itemName, selectedFile, itemColor);

            const lastItemId = state['lastItemId'];

            console.log('reached fetch request');

            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('id', lastItemId+1);
            formData.append('name', itemName);
            formData.append('type', itemType);
            formData.append('color', itemColor);

            fetch('/api/items', {
              method: 'POST',
              body: formData,
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
            }} type="submit" value="Add Item" />
          <button className="red-button" onClick={()=>{toggleModal();handleClick();}}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ItemCreatorModal;
