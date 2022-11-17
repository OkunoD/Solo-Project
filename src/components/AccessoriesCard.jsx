import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addAccessoriesActionCreator, deleteAccessoryActionCreator, tryOnAccessoryActionCreator } from '../actions/actions.js'
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
  tryOnAccessory : (payload) => dispatch(tryOnAccessoryActionCreator(payload)),
  deleteAccessory : (payload) => dispatch(deleteAccessoryActionCreator(payload)),
});

const Accessories = (props) => {
    key = props.index;

    return (
      <div className="itemBox">
        <p><strong>&nbsp;&nbsp;{props.accesssoryName}</strong></p>
        <p>&nbsp;&nbsp;{props.accessoryColor}</p>
        <p>&nbsp;&nbsp;{props.imgUrl}</p>{/* need to add img styling*/}
        <div className="itemButton">
          <input className="selectItemButton" onClick={() => props.tryOnAccessory(props.accessoryId)} type="Submit" value="Try it on" readOnly/>
          <input className="deleteItemButton" onClick={() => props.deleteAccessory(props.accessoryId)} type="Submit" value="Delete" readOnly/>
        </div>
      </div>
    );};

export default connect(mapStateToProps, mapDispatchToProps) (Accessories);