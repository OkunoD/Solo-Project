import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addJacketActionCreator, deleteJacketActionCreator, tryOnJacketActionCreator } from '../actions/actions.js'
import './styles.css'; 

let key = undefined;

const mapStateToProps = function(state, ownProps) {
  return {
    itemId: ownProps.id,
    itemName: ownProps.name,
    itemColor: ownProps.color,
    imgUrl: ownProps.imgUrl,
  };
};

const mapDispatchToProps = (dispatch) => ({
});

const Item = (props) => {
    key = props.index;

    return (
      <div className="itemBox">
        <p><strong>&nbsp;&nbsp;{props.itemName}</strong></p>
        <p>&nbsp;&nbsp;{props.itemColor}</p>
        <p>&nbsp;&nbsp;{props.imgUrl}</p>{/* need to add img styling*/}
        <div className="itemButton">
          <input className="selectItemButton" onClick={() => {
            console.log('tryon input received')}
           } readOnly/>
          <input className="deleteItemButton" onClick={() => {
            console.log('delete input received')}
           } readOnly/>
        </div>
      </div>
    );};

export default connect(mapStateToProps, mapDispatchToProps) (Item);

