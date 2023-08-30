import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteItemActionCreator, tryOnItemActionCreator } from '../actions/actions.js'
import './styles.css'; 

let key = undefined;

const mapStateToProps = function(state, ownProps) {
  return {
    topId: state.topsList[ownProps.index].id,
    topName: state.topsList[ownProps.index].name,
    topColor: state.topsList[ownProps.index].color,
    file: state.topsList[ownProps.index].file,
  };
};

const mapDispatchToProps = (dispatch) => ({
  tryOnItem : (payload1, payload2, payload3) => dispatch(tryOnItemActionCreator(payload1, payload2, payload3)),
  deleteItem : (payload1, payload2) => dispatch(deleteItemActionCreator(payload1, payload2)),
});

const Tops = (props) => {
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
      <p><strong>&nbsp;&nbsp;{props.topName}</strong></p>
      <p>&nbsp;&nbsp;{props.topColor}</p>
      <p>&nbsp;&nbsp;{props.imgUrl}</p>{/* need to add img styling*/}
      <div className="itemButton">
        <input className="selectItemButton" onClick={() => {
          console.log('tryon input received');
          props.tryOnItem('tops', props.topId, 'Top')}} type="Submit" value="Try it on" readOnly/>
        <input className="deleteItemButton" onClick={() => {
          handleDelete(props.topsId);
          props.deleteItem('tops', props.topId)}} type="Submit" value="Delete" readOnly/>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps) (Tops);

