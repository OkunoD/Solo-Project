import React, { useState, useEffect } from 'react';
import { filterDrawerActionCreator } from '../actions/actions';
import { useDispatch } from 'react-redux';

const FilterModal = (props) => {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1', checked: false },
    { id: 2, text: 'Item 2', checked: false },
    { id: 3, text: 'Item 3', checked: false },
  ]);

  const dispatch = useDispatch();

  const clothingType = props.clothingType;
  const colorsArr = props.colorsArr;
  const brandsArr = props.brandsArr;
  const sizesArr = props.sizesArr;
  const subtypesArr = props.subtypesArr;

  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [subtypes, setSubtypes] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const colorsChecklistArray = [];
  const brandsChecklistArray = [];
  const sizesChecklistArray = [];
  const subtypesChecklistArray = [];
  
  useEffect(()=> {
    console.log('hello working');
    createChecklists();
    console.log(subtypes.length);
  }, []);
  // console.log('colorsChecklistArray is', colorsChecklistArray)
  const createChecklists = () => {
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

    for (let i = 0; i < brandsArr.length; i++) {
      console.log('inside LoooooOp')
      brandsChecklistArray.push({
        id: i+1,
        text: brandsArr[i],
        checked: false,
      }
      )
    }
    setBrands(brandsChecklistArray);

    for (let i = 0; i < sizesArr.length; i++) {
      console.log('inside LoooooOp')
      sizesChecklistArray.push({
        id: i+1,
        text: sizesArr[i],
        checked: false,
      }
      )
    }
    setSizes(sizesChecklistArray);

    for (let i = 0; i < subtypesArr.length; i++) {
      console.log('inside LoooooOp')
      subtypesChecklistArray.push({
        id: i+1,
        text: subtypesArr[i],
        checked: false,
      }
      )
    }
    setSubtypes(subtypesChecklistArray);
  };
  
  const clearFilters = () => {
    colors.forEach((type) => type.checked = false);
    brands.forEach((type) => type.checked = false);
    sizes.forEach((type) => type.checked = false);
    subtypes.forEach((type) => type.checked = false);
    setRefresh(!refresh);

    // can disable dispatch below if want to just clear checks without 
    // actually refilling drawer without any filters
    dispatch(filterDrawerActionCreator(clothingType, [], [], [], []));
  }
  
  const handleSubmit = () => {
    const colorFilter = [];
    const brandsFilter = [];
    const sizesFilter = [];
    const subtypesFilter = [];
    colors.forEach((type)=> (type.checked === true) && colorFilter.push(type.text))
    brands.forEach((type)=> (type.checked === true) && brandsFilter.push(type.text))
    sizes.forEach((type)=> (type.checked === true) && sizesFilter.push(type.text))
    subtypes.forEach((type)=> (type.checked === true) && subtypesFilter.push(type.text))
    
    dispatch(filterDrawerActionCreator(clothingType, colorFilter, brandsFilter, sizesFilter, subtypesFilter));
    // props.setShowFilterModal();
  }
  
  const handleCheckboxChange = (itemId, checklistCategory) => {
    if (checklistCategory === 'colors') {
      const updatedChecklist = colors.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      );
      setColors(updatedChecklist);
    } else if (checklistCategory === 'brands') {
      const updatedChecklist = brands.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      );
      setBrands(updatedChecklist);
    } else if (checklistCategory === 'sizes') {
      const updatedChecklist = sizes.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      );
      setSizes(updatedChecklist);
    } else if (checklistCategory === 'subtypes') {
      const updatedChecklist = subtypes.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      );
      setSubtypes(updatedChecklist);
    }
  };

  return (
    <div className="filter-modal">
      {/* <div className="color-and-brand-filter-div"> */}
      <div className="filter-category-div">
        <p className="filter-name">color</p>
        <ul className="filter-checklist">
          {colors && colors.map((type) => (
            <li key={type.id}>
              <label>
                <input
                  type="checkbox"
                  checked={type.checked}
                  onChange={() => handleCheckboxChange(type.id, "colors")}
                  />
                {type.text}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="filter-category-div">
        <p className="filter-name">brand</p>
        <ul className="filter-checklist">
          {brands && brands.map((type) => (
            <li key={type.id}>
              <label>
                <input
                  type="checkbox"
                  checked={type.checked}
                  onChange={() => handleCheckboxChange(type.id, "brands")}
                  />
                {type.text}
              </label>
            </li>
          ))}
        </ul>
       </div>
      {/* </div> */}
      {/* <div className="size-and-subtype-filter-div"> */}
      <div className="filter-category-div">
        <p className="filter-name">size</p>
        <ul className="filter-checklist">
          {sizes && sizes.map((type) => (
            <li key={type.id}>
              <label>
                <input
                  type="checkbox"
                  checked={type.checked}
                  onChange={() => handleCheckboxChange(type.id, "sizes")}
                  />
                {type.text}
              </label>
            </li>
          ))}
        </ul>
        </div>
      <div className="filter-category-div">
        <p className="filter-name">subtype</p>
        <ul className="filter-checklist">
          {subtypes && subtypes.map((type) => (
            <li key={type.id}>
              <label>
                <input
                  type="checkbox"
                  checked={type.checked}
                  onChange={() => handleCheckboxChange(type.id, "subtypes")}
                  />
                {type.text}
              </label>
            </li>
          ))}
        </ul>
      </div>
      {/* </div> */}
      <div className="filter-buttons-div">
        <button className="clear-filter-button" onClick={()=>clearFilters()}>clear filters</button>
        <button className="apply-filter-button" onClick={()=>handleSubmit()}>APPLY FILTERS</button>
      </div>
    </div>
  );
}

export default FilterModal;
