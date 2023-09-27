import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { updateItemActionCreator } from '../actions/actions';

export const ItemEditorModal = ({ toggleModal, handleClick, itemId, itemList }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [itemType, setType] = useState('');
  const [itemBrand, setBrand] = useState('');
  const [itemName, setName] = useState('');
  const [itemColor, setColor] = useState('');
  const [itemSize, setSize] = useState('');
  console.log(itemList);
  // Fetch the item data based on itemId from the server or Redux store.
  useEffect(() => {
    // Fetch the item data based on the itemId and populate the form fields.
    const item = state[itemList].find((item) => item.id === itemId);
    if (item) {
        setType(item.type);
        setBrand(item.brand);
        setName(item.name);
        setColor(item.color);
        setSize(item.size);
    }
  }, [itemId]);

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
    toggleModal();
    handleClick();
  };

  return (
    <div className="edit-item-modal">
      <div className="editItemHeaders">EDIT ITEM</div>
      <div className="editItemBorders">
        {/* Render the same form fields as the creation component with values pre-populated. */}
        {/* Add onChange handlers to update the state when the user edits the fields. */}
        {/* Add a button to trigger the updateItem function. */}
        {/* Add a close button to close the modal. */}
      </div>
    </div>
  );
};

export default ItemEditorModal;
