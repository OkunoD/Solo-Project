import React, { useState, useEffect } from 'react';

const FilterModal = (props) => {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1', checked: false },
    { id: 2, text: 'Item 2', checked: false },
    { id: 3, text: 'Item 3', checked: false },
  ]);

  const colorsArr = props.colorsArr;

  const [colors, setColors] = useState(colorsChecklistArray);
  const colorsChecklistArray = [];
  
  const createColorsChecklist = () => {
    for (let i = 0; i < colorsArr.length; i++) {
      console.log('inside LoooooOp')
      colorsChecklistArray.push({
        id: i+1,
        text: colorsArr[i],
        checked: false,
      }
      )
    }
    // console.log('inchecklist props.colors is: ', props.colorsArr);
    // console.log('inchecklist colorsArray is: ', colorsChecklistArray);
    setColors(colorsChecklistArray);
  };

  useEffect(()=> {
    console.log('hello working');
    createColorsChecklist();
  }, []);
  // console.log('colorsChecklistArray is', colorsChecklistArray)

  const submitFilters = () => {
    
  }
  
  const handleCheckboxChange = (itemId) => {
    const updatedColors = colors.map((item) =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setColors(updatedColors);
  };

  return (
    <div>
      <h2>Filter By</h2>
      {/* <ul>
        {items.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheckboxChange(item.id)}
              />
              {item.text}
            </label>
          </li>
        ))}
      </ul> */}
      <h2>color:</h2>
      <ul>
        {console.log('before checklist map')}
        {console.log('colorsChecklistArray is', colorsChecklistArray)}
        {console.log('colors is', colors)}
        {colors && colors.map((color) => (
          <li key={color.id}>
            <label>
              <input
                type="checkbox"
                checked={color.checked}
                onChange={() => handleCheckboxChange(color.id)}
              />
              {color.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterModal;
