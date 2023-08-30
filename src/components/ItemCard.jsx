import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addJacketActionCreator, deleteJacketActionCreator, tryOnJacketActionCreator } from '../actions/actions.js'
import './styles.css'; 

// let key = undefined;

const mapStateToProps = function(state, ownProps) {
  return {
    id: ownProps.id,
    name: ownProps.name,
    color: ownProps.color,
    file: ownProps.file,
  };
};

const mapDispatchToProps = (dispatch) => ({
});

const Item = (props) => {
    // key = props.index;
    console.log('in Item, props is', props);
    console.log('in Item, props.file is:', props.file);
    console.log('in Item, props.contentType is:', props.contentType);

    console.log('in Item, props.id is:', props.id);
    console.log('in Item, props.name is:', props.name);
    console.log('in Item, props.color is:', props.color);

    const [imageSrc, setImageSrc] = useState('');

    // console.log('in Item, props.imgUrl is:', props.imgUrl);

    const imageData = props.file ? props.file.data : null;
    console.log('imageData is', imageData);
    const contentType = props.contentType;

    useEffect(() => {
      // Convert ArrayBuffer to base64
      const base64 = btoa(
        new Uint8Array(imageData).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
      setImageSrc(`data:${contentType};base64,${base64}`);
    }, [props]);


    return (
      <div className="itemBox">
        <div className="image-container">
          <img src={imageSrc} alt="Retrieved from state" className="image-content" />
        </div>
        <p><strong>&nbsp;&nbsp;{props.name}</strong></p>
        <p>&nbsp;&nbsp;{props.color}</p>
        <p>&nbsp;&nbsp;{props.imgUrl}</p>{/* need to add img styling*/}
        {/* <div className="itemButton">
          <input className="selectItemButton" onClick={() => {
            console.log('tryon input received')}
           } readOnly/>
          <input className="deleteItemButton" onClick={() => {
            console.log('delete input received')}
           } readOnly/>
        </div> */}
      </div>
    );};

export default connect(mapStateToProps, mapDispatchToProps) (Item);

