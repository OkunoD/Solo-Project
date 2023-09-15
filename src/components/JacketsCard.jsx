import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteItemActionCreator, tryOnItemActionCreator } from '../actions/actions.js'


let key = undefined;

const mapStateToProps = function(state, ownProps) {
  return {
    id: state.jacketsList[ownProps.index].id,
    name: state.jacketsList[ownProps.index].name,
    color: state.jacketsList[ownProps.index].color,
    size: state.jacketsList[ownProps.index].size,
    brand: state.jacketsList[ownProps.index].brand,
    file: state.jacketsList[ownProps.index].file,
  };
};

const mapDispatchToProps = (dispatch) => ({
  tryOnItem : (payload1, payload2, payload3) => dispatch(tryOnItemActionCreator(payload1, payload2, payload3)),
  deleteItem : (payload1, payload2) => dispatch(deleteItemActionCreator(payload1, payload2)),
});

const Jackets = (props) => {
    key = props.index;

    const [imageSrc, setImageSrc] = useState('');

    const imageData = props.file ? props.file.data : null;
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
  
    const handleDelete = (itemId) => {
      fetch(`/api/items/${itemId}`, {
        method: "DELETE",
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
    };

    return (
      <div className="itemBox">
        <div className="image-container">
          <img src={imageSrc} alt="Retrieved from state" className="image-content" />
        </div>
        <div>
          <div className="item-details">
            <div className="designer-and-size">
            <p className="item-brand">{props.brand ? props.brand : 'no brand'}</p>
            <p className="item-size">{props.size ? props.size: 'no size'}</p>
          </div>
          <p className="item-name">{props.name}</p>
          <div className="item-button-div">
            <input className="black-button" onClick={() => {
              console.log('tryon input received');
              console.log('jacketId is: ', props.id);
              props.tryOnItem('jackets', props.id, 'Jacket')}} type="Submit" value="Try it on" readOnly/>
            <input className="red-button" onClick={() => {
              handleDelete(props.id);
              props.deleteItem('jackets', props.id)}} type="Submit" value="Delete" readOnly/>
            </div>
          </div>
        </div>
      </div>
    );};

export default connect(mapStateToProps, mapDispatchToProps) (Jackets);

