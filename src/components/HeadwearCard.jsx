import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteItemActionCreator, tryOnItemActionCreator } from '../actions/actions.js'
import './styles.css'; 

let key = undefined;

const mapStateToProps = function(state, ownProps) {
  return {
    headwearId: state.headwearList[ownProps.index].id,
    headwearName: state.headwearList[ownProps.index].name,
    headwearColor: state.headwearList[ownProps.index].color,
    file: state.headwearList[ownProps.index].file,
    //state below comment not needed
    headwearList: state.headwearList,
    ownProps: ownProps,
    randomNum: 299,
    selectedHeadwear: state.selectedHeadwear,
  };
};

const mapDispatchToProps = (dispatch) => ({
  tryOnItem : (payload1, payload2, payload3) => dispatch(tryOnItemActionCreator(payload1, payload2, payload3)),
  deleteItem : (payload1, payload2) => dispatch(deleteItemActionCreator(payload1, payload2)),
});

const Headwear = (props) => {
  const [imageSrc, setImageSrc] = useState('');

  key = props.index;

  console.log('props in headwear is: ', props)

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

  return (
    <div className="itemBox">
      <div className="image-container">
        <img src={imageSrc} alt="Retrieved from state" className="image-content" />
      </div>
      <p><strong>&nbsp;&nbsp;{props.headwearName}</strong></p>
      <p>&nbsp;&nbsp;{props.headwearColor}</p>
      <p>&nbsp;&nbsp;{props.imgUrl}</p>{/* need to add img styling*/}
      <div className="itemButton">
        <input className="selectItemButton" onClick={() => {
          console.log('tryon input received');
          props.tryOnItem('headwear', props.headwearId, 'Headwear')}} type="Submit" value="Try it on" readOnly/>
        <input className="deleteItemButton" onClick={() => {
          props.deleteItem('headwear', props.headwearId)}} type="Submit" value="Delete" readOnly/>
      </div>
    </div>
  );};

export default connect(mapStateToProps, mapDispatchToProps) (Headwear);

