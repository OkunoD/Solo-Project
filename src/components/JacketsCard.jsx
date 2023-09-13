import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteItemActionCreator, tryOnItemActionCreator } from '../actions/actions.js'


let key = undefined;

const mapStateToProps = function(state, ownProps) {
  return {
    jacketId: state.jacketsList[ownProps.index].id,
    jacketName: state.jacketsList[ownProps.index].name,
    jacketColor: state.jacketsList[ownProps.index].color,
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
        {/* <p>&nbsp;&nbsp;{props.jacketColor}</p> */}
        {/* <p>&nbsp;&nbsp;{props.imgUrl}</p>need to add img styling */}
        <div>
          <div className="item-details">
            <div className="designer-and-size">
            <p className="item-brand">brandname</p>
            <p className="item-size">size</p>
          </div>
          <p className="item-name">{props.jacketName}</p>
          <div className="item-button-div">
            <input className="black-button" onClick={() => {
              console.log('tryon input received');
              console.log('jacketId is: ', props.jacketId);
              props.tryOnItem('jackets', props.jacketId, 'Jacket')}} type="Submit" value="Try it on" readOnly/>
            <input className="red-button" onClick={() => {
              handleDelete(props.jacketId);
              props.deleteItem('jackets', props.jacketId)}} type="Submit" value="Delete" readOnly/>
            </div>
          </div>
        </div>
      </div>
    );};

export default connect(mapStateToProps, mapDispatchToProps) (Jackets);

