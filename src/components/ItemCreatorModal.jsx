import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItemActionCreator, openAlert, closeAlert, fillWardrobeActionCreator } from '../actions/actions';
// import { connect } from 'react-redux';
import { mockData } from '../../mockData';

export const ItemCreatorModal = ({toggleModal, handleClick}) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);
  const [itemType, setType] = useState('');
  const [itemBrand, setBrand] = useState('');
  const [itemName, setName] = useState('');
  const [itemColor, setColor] = useState('');
  const [itemSize, setSize] = useState('');
  const [itemSubtype, setSubtype] = useState('');

  const addItem = (payload1, payload2, payload3, payload4, payload5, payload6) => {
    dispatch(addItemActionCreator(payload1,payload2,payload3,payload4,payload5, payload6));
  }

  const toggleAlert = (message, color) => {
    console.log('before dispatch in togglealert');
    dispatch(openAlert(message, color));
  }

  const handleCategorySelect = (e) => {
    setType(e.target.value);
  };

  const handleSubtypeSelect = (e) => {
    setSubtype(e.target.value);
  };

  const handleColorSelect = (e) => {
    setColor(e.target.value);
  };
  const handleSizeSelect = (e) => {
    setSize(e.target.value);
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  }

  const handleSubmit = () => {
    const lastItemId = state['lastItemId'];
    const formData = new FormData();

    formData.append('file', selectedFile);
    formData.append('id', lastItemId+1);
    formData.append('name', itemName);
    formData.append('type', itemType);
    formData.append('color', itemColor);
    formData.append('brand', itemBrand);
    formData.append('size', itemSize);
    formData.append('subtype', itemSubtype);

    fetch('/api/items', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log('inside post request before toggleAlert, data.message is: ', data.message);
        toggleAlert(data.message, "green");
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="add-item-modal">
      {/* <div className="addItemHeaders">ADD PIECE</div> */}
      <div className="add-item-borders">
        <div>
        <select className="select-list" id="category-select-list" data-testid="category-select-list" onChange={handleCategorySelect} value={itemType}>
         <option value="null">Category</option>
         <option value="headwear">Hat</option>
         <option value="tops">Top</option>
         <option value="jackets">Jacket</option>
         <option value="bottoms">Bottoms</option>
         <option value="shoes">Shoes</option>
         <option value="accessories">Accessory</option>
         <option value="underwear">Underwear</option>
        </select>
        <select className="select-list" id="color-select-list" data-testid="color-select-list" onChange={handleColorSelect} value={itemColor}>
         <option value="null">Color</option>
         <option value="White">White</option>
         <option value="Black">Black</option>
         <option value="Grey">Grey</option>
         <option value="Navy">Navy</option>
         <option value="Blue">Blue</option>
         <option value="Light Blue">Light Blue</option>
         <option value="Purple">Purple</option>
         <option value="Pink">Pink</option>
         <option value="Red">Red</option>
         <option value="Green">Green</option>
         <option value="Yellow">Yellow</option>
         <option value="Orange">Orange</option>
         <option value="Brown">Brown</option>
         <option value="Tan">Tan</option>
         <option value="Cream">Cream</option>
         <option value="Gold">Gold</option>
         <option value="Silver">Silver</option>
         <option value="New Color">New Color</option>
        </select>
        <select className="select-list" id="size-select-list" data-testid="size-select-list" onChange={handleSizeSelect} value={itemSize}>
         <option value="null">Size</option>
         <option value="XXS">XXS</option>
         <option value="XS">XS</option>
         <option value="S">S</option>
         <option value="M">M</option>
         <option value="L">L</option>
         <option value="XL">XL</option>
         <option value="XXL">XXL</option>
         <option value="6">6</option>
         <option value="7">7</option>
         <option value="7.5">7.5</option>
         <option value="8">8</option>
         <option value="8.5">8.5</option>
         <option value="9">9</option>
         <option value="9.5">9.5</option>
         <option value="10.5">10.5</option>
         <option value="11">11</option>
         <option value="12">12</option>
         <option value="13">13</option>
         <option value="26">26</option>
         <option value="27">27</option>
         <option value="28">28</option>
         <option value="29">29</option>
         <option value="30">30</option>
         <option value="31">31</option>
         <option value="32">32</option>
         <option value="33">33</option>
        </select>
        </div>
        <div>
          <input className="user-input-field" placeholder="Subtype" onChange={(e) => setSubtype(e.target.value)} type="text" value={itemSubtype} />
        </div>
        <div>
          <input className="user-input-field" placeholder="Brand" onChange={(e) => setBrand(e.target.value)} type="text" value={itemBrand} />
        </div>
        <div>
          <input className="user-input-field" placeholder="Name" onChange={(e) => setName(e.target.value)} type="text" value={itemName} />
        </div>
        <div>
          <input className="file-input" id="getFile" type="file" placeholder="Item Name" accept="image/*" onChange={handleFileChange} />
        </div>
        <div className="add-item-buttons-container">
          <input style={{padding: '3px'}} className="green-button" data-testid="submit-item-button" onClick={() => {
            // props.addItem(itemType, itemName, selectedFile, itemColor);
            console.log('itemSize is', itemSize);
            console.log('itemBrand is', itemBrand);
            addItem(itemType, itemName, selectedFile, itemColor, itemBrand, itemSize);
            handleSubmit();
            }} type="submit" value="Add Item" />
          <button data-testid="close-modal-button" className="red-button" onClick={()=>{toggleModal();handleClick();}}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ItemCreatorModal;
