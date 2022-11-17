import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addJacketActionCreator, deleteJacketActionCreator, tryOnJacketActionCreator } from '../actions/actions.js'
import './styles.css'; 

let key = undefined;

const mapStateToProps = function(state, ownProps) {
  return {
    jacketId: state.jacketsList[ownProps.index].id,
    jacketName: state.jacketsList[ownProps.index].name,
    jacketColor: state.jacketsList[ownProps.index].color,
    imgUrl: state.jacketsList[ownProps.index].imgUrl,
  };
};

const mapDispatchToProps = (dispatch) => ({
  tryOnJacket : (payload) => dispatch(tryOnJacketActionCreator(payload)),
  deleteJacket : (payload) => dispatch(deleteJacketActionCreator(payload)),
});

const Jackets = (props) => {
    key = props.index;

    return (
      <div className="itemBox">
        <p><strong>&nbsp;&nbsp;{props.jacketName}</strong></p>
        <p>&nbsp;&nbsp;{props.jacketColor}</p>
        <p>&nbsp;&nbsp;{props.imgUrl}</p>{/* need to add img styling*/}
        <div className="itemButton">
          <input className="selectItemButton" onClick={() => props.tryOnJacket(props.jacketId)} type="Submit" value="Try it on" readOnly/>
          <input className="deleteItemButton" onClick={() => props.deleteJacket(props.jacketId)} type="Submit" value="Delete" readOnly/>
        </div>
      </div>
    );};

export default connect(mapStateToProps, mapDispatchToProps) (Jackets);

