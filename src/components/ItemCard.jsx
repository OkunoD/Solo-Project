import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { takeOffItemActionCreator, openAlert, closeAlert } from '../actions/actions.js'


// let key = undefined;

const mapStateToProps = function(state, ownProps) {
  return {
    id: ownProps.id,
    name: ownProps.name,
    color: ownProps.color,
    type: ownProps.type,
    file: ownProps.file,
    brand: ownProps.brand,
    size: ownProps.size,
  };
};

const mapDispatchToProps = (dispatch) => ({
  takeOffItem: (payload1, payload2) => dispatch(takeOffItemActionCreator(payload1, payload2)),
});

const ItemCard = (props) => {
    // key = props.index;
    // console.log('in Item, props is', props);
    // console.log('in Item, props.file is:', props.file);
    // console.log('in Item, props.contentType is:', props.contentType);

    // console.log('in Item, props.id is:', props.id);
    // console.log('in Item, props.name is:', props.name);
    // console.log('in Item, props.color is:', props.color);

    const [imageSrc, setImageSrc] = useState('');

    // console.log('in Item, props.imgUrl is:', props.imgUrl);

    const imageData = props.file ? props.file.data : null;
    // console.log('imageData is', imageData);
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
        <div>
        <div className="item-details">
          <div className="designer-and-size">
            <p className="item-brand">{props.brand}</p>
            <p className="item-size">{props.size}</p>
          </div>
        <p className="item-name">{props.name}</p>
          <div className="item-button-div">
            <input className="red-button" type="Submit" value="take off" onClick={() => {
              console.log('take off input received')
              props.takeOffItem(props.id, props.type)}
            } readOnly/>
          </div>
        </div>
      </div>
    </div>
    );};

export default connect(mapStateToProps, mapDispatchToProps) (ItemCard);

