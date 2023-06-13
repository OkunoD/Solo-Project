import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { addItemActionCreator, fillWardrobeActionCreator } from '../actions/actions';
import { connect } from 'react-redux';
import './styles.css';
//   const [location, setLocation] = useState('');
//   useEffect(() => {}, [location]);
const mapDispatchToProps = dispatch => ({
  // addMarket : (location) => dispatch(addMarketActionCreator(location)),
  fillWardrobe : (payload) => dispatch(fillWardrobeActionCreator(payload)),
  addItem : (payload1, payload2, payload3, payload4) => dispatch(addItemActionCreator(payload1, payload2, payload3, payload4)),
  addHeadwear : (payload1, payload2, payload3) => dispatch(addHeadwearActionCreator(payload1,payload2,payload3)),
  addTop : (payload1, payload2, payload3) => dispatch(addTopActionCreator(payload1,payload2,payload3)),
  addJacket : (payload1, payload2, payload3) => dispatch(addJacketActionCreator(payload1,payload2,payload3)),
  addBottom : (payload1, payload2, payload3) => dispatch(addBottomActionCreator(payload1,payload2,payload3)),
  addShoes : (payload1, payload2, payload3) => dispatch(addShoesActionCreator(payload1,payload2,payload3)),
  addAccessory : (payload1, payload2, payload3) => dispatch(addAccessoriesActionCreator(payload1,payload2,payload3)),
});

const ItemCreator = (props) => {
  const state = useSelector((state) => state);
  const [itemType, setType] = useState('');
  const [itemName, setName] = useState('');
  const [itemUrl, setUrl] = useState('');
  const [itemColor, setColor] = useState('');
  const handleSelect = (e) => {
    setType(e.target.value);
  };
  //BELOW CODE TO FILL WARDROBE FROM DATABASE
  useEffect(() => {
    console.log('useeffect hit')
    fetch('/api/items')
      .then((response) => {
        console.log('response is: ', response);
        return response.json();
      })
      .then((data) => {
        console.log('data is: ', data);
        props.fillWardrobe(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [itemType]);
  // //END DATABASE TESTING CODE
  
  return (
    <div className="addItemBox">
      <div className="addItemHeaders">Add Piece</div>
      <div className="addItemBorders">
        <div>
        <label>Type: </label>
        <select name="selectList" id="selectList" onChange={handleSelect} value={itemType}>
         <option value="null">select type</option>
         <option value="headwear">Hat</option>
         <option value="tops">Top</option>
         <option value="jackets">Jacket</option>
         <option value="bottoms">Bottom</option>
         <option value="shoes">Shoes</option>
         <option value="accessories">Accessory</option>
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
            props.addItem(itemType, itemName, itemUrl, itemColor);
            const lastItemIdString = `last${itemType.charAt(0).toUpperCase()}${itemType.slice(1)}Id`;
            const lastItemId = state[lastItemIdString];

            console.log('reached fetch request');
            fetch('/api/items', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: lastItemId+1,
                type: itemType,
                name: itemName,
                imgUrl: itemUrl,
                color: itemColor,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
      }} type="submit" value="Add Item" />
      </div>
    </div>
  );
};


// export default MarketCreator;

export default connect(null, mapDispatchToProps) (ItemCreator);