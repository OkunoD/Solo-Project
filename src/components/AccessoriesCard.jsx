import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteItemActionCreator, tryOnItemActionCreator } from '../actions/actions.js'
import './styles.css'; 

let key = undefined;

const mapStateToProps = function(state, ownProps) {
  return {
    accessoryId: state.accessoriesList[ownProps.index].id,
    accessoryName: state.accessoriesList[ownProps.index].name,
    accessoryColor: state.accessoriesList[ownProps.index].color,
    imgUrl: state.accessoriesList[ownProps.index].imgUrl
  };
};

const mapDispatchToProps = (dispatch) => ({
  tryOnItem : (payload1, payload2, payload3) => dispatch(tryOnItemActionCreator(payload1, payload2, payload3)),
  deleteItem : (payload1, payload2) => dispatch(deleteItemActionCreator(payload1, payload2)),
});

const Accessories = (props) => {
    key = props.index;

    return (
      <div className="itemBox">
        <p><strong>&nbsp;&nbsp;{props.accesssoryName}</strong></p>
        <p>&nbsp;&nbsp;{props.accessoryColor}</p>
        <p>&nbsp;&nbsp;{props.imgUrl}</p>{/* need to add img styling*/}
        <div className="itemButton">
        <input className="selectItemButton" onClick={() => {
            console.log('tryon input received');
            props.tryOnItem('accessories', props.accessoryId, 'Accessory')}} type="Submit" value="Try it on" readOnly/>
          <input className="deleteItemButton" onClick={() => {
            props.deleteItem('accessories', props.accessoryId)}} type="Submit" value="Delete" readOnly/>
        </div>
      </div>
    );};

export default connect(mapStateToProps, mapDispatchToProps) (Accessories);