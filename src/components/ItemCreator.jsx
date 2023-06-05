import React, {useEffect, useState} from 'react';
import { 
  addHeadwearActionCreator,
  addTopActionCreator,
  addJacketActionCreator,
  addBottomActionCreator, 
  addShoesActionCreator,
  addAccessoriesActionCreator, } from '../actions/actions';
import { connect } from 'react-redux';
import './styles.css';
//   const [location, setLocation] = useState('');
//   useEffect(() => {}, [location]);
const mapDispatchToProps = dispatch => ({
  // addMarket : (location) => dispatch(addMarketActionCreator(location)),
  addHeadwear : (payload1, payload2, payload3) => dispatch(addHeadwearActionCreator(payload1,payload2,payload3)),
  addTop : (payload1, payload2, payload3) => dispatch(addTopActionCreator(payload1,payload2,payload3)),
  addJacket : (payload1, payload2, payload3) => dispatch(addJacketActionCreator(payload1,payload2,payload3)),
  addBottom : (payload1, payload2, payload3) => dispatch(addBottomActionCreator(payload1,payload2,payload3)),
  addShoes : (payload1, payload2, payload3) => dispatch(addShoesActionCreator(payload1,payload2,payload3)),
  addAccessory : (payload1, payload2, payload3) => dispatch(addAccessoriesActionCreator(payload1,payload2,payload3)),
});

const ItemCreator = (props) => {
  const [itemType, setType] = useState('');
  const [itemName, setName] = useState('');
  const [itemUrl, setUrl] = useState('');
  const [itemColor, setColor] = useState('');
  const handleSelect = (e) => {
    setType(e.target.value);
  };

  return (
    <div className="addItemBox">
      <div className="addItemHeaders">Add Piece</div>
      <div className="addItemBorders">
        <div>
        <label>Type: </label>
        <select name="selectList" id="selectList" onChange={handleSelect} value={itemType}>
         <option value="null">select type</option>
         <option value="headwear">Hat</option>
         <option value="top">Top</option>
         <option value="jacket">Jacket</option>
         <option value="bottom">Bottom</option>
         <option value="shoes">Shoes</option>
         <option value="accessory">Accessory</option>
        </select>
        </div>
        <div>
          <label>Item Name: </label>
          <input className="addItemField" onChange={(e) => setName(e.target.value)} type="text" value={itemName} />
        </div>
        <div>
          <label>Color: </label>
          <input className="addItemField" onChange={(e) => setColor(e.target.value)} type="text" value={itemColor} />
        </div>
        <div>
          <label>Img Url: </label>
          <input className="addItemField" onChange={(e) => setUrl(e.target.value)} type="text" value={itemUrl} />
        </div>
        <input style={{padding: '3px'}} className="addItem" onClick={() => {
            console.log('input received');
            console.log(itemName, itemUrl, itemColor);
            if (itemType === "headwear") {
              props.addHeadwear(itemName,itemUrl,itemColor);
            } if (itemType === "top") {
              props.addTop(itemName,itemUrl,itemColor);
            } if (itemType === "jacket") {
              props.addJacket(itemName,itemUrl,itemColor);
            } if (itemType === "bottom") {
              props.addBottom(itemName,itemUrl,itemColor);
            } if (itemType === "shoes") {
              props.addShoes(itemName,itemUrl,itemColor);
            } if (itemType === "accessory") {
              props.addAccessory(itemName,itemUrl,itemColor);
            }
      }} type="submit" value="Add Item" />
      </div>
    </div>
  );
};


// export default MarketCreator;

export default connect(null, mapDispatchToProps) (ItemCreator);