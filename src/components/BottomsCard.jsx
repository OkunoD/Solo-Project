import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addBottomActionCreator, deleteBottomActionCreator, tryOnBottomActionCreator } from '../actions/actions.js'
import './styles.css'; 

let key = undefined;

const mapStateToProps = function(state, ownProps) {
  return {
    bottomId: state.bottomsList[ownProps.index].id,
    bottomName: state.bottomsList[ownProps.index].name,
    bottomColor: state.bottomsList[ownProps.index].color,
    imgUrl: state.bottomsList[ownProps.index].imgUrl
  };
};

const mapDispatchToProps = (dispatch) => ({
  tryOnBottom : (payload) => dispatch(tryOnBottomActionCreator(payload)),
  deleteBottom : (payload) => dispatch(deleteBottomActionCreator(payload)),
});

const Bottoms = (props) => {
    key = props.index;

    return (
      <div className="itemBox">
        <p><strong>&nbsp;&nbsp;{props.bottomName}</strong></p>
        <p>&nbsp;&nbsp;{props.bottomColor}</p>
        <p>&nbsp;&nbsp;{props.imgUrl}</p>{/* need to add img styling*/}
        <div className="itemButton">
          <input className="selectItemButton" onClick={() => props.tryOnBottom(props.bottomId)} type="Submit" value="Try it on" readOnly/>
          <input className="deleteItemButton" onClick={() => props.deleteBottom(props.bottomId)} type="Submit" value="Delete" readOnly/>
        </div>
      </div>
    );};

export default connect(mapStateToProps, mapDispatchToProps) (Bottoms);