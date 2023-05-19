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
         <option value="addHeadwear">select type</option>
         <option value="addHeadwear">Hat</option>
         <option value="addTop">Top</option>
         <option value="addJacket">Jacket</option>
         <option value="addBottom">Bottom</option>
         <option value="addShoes">Shoes</option>
         <option value="addAccessory">Accessory</option>
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
            if (itemType === "addHeadwear") {
              props.addHeadwear(itemName,itemUrl,itemColor);
            } if (itemType === "addTop") {
              props.addTop(itemName,itemUrl,itemColor);
            } if (itemType === "addJacket") {
              props.addJacket(itemName,itemUrl,itemColor);
            } if (itemType === "addBottom") {
              props.addBottom(itemName,itemUrl,itemColor);
            } if (itemType === "addShoes") {
              props.addShoes(itemName,itemUrl,itemColor);
            } if (itemType === "addAccessory") {
              props.addAccessory(itemName,itemUrl,itemColor);
            }
      }} type="submit" value="Add Item" />
      </div>
    </div>
  );
};


// export default MarketCreator;

export default connect(null, mapDispatchToProps) (ItemCreator);