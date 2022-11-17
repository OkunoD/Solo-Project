import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTopActionCreator, deleteTopActionCreator, tryOnTopActionCreator } from '../actions/actions.js'
import './styles.css'; 

let key = undefined;

const mapStateToProps = function(state, ownProps) {
  return {
    topId: state.topsList[ownProps.index].id,
    topName: state.topsList[ownProps.index].name,
    topColor: state.topsList[ownProps.index].color,
    imgUrl: state.topsList[ownProps.index].imgUrl,
  };
};

const mapDispatchToProps = (dispatch) => ({
  tryOnTop : (payload) => dispatch(tryOnTopActionCreator(payload)),
  deleteTop : (payload) => dispatch(deleteTopActionCreator(payload)),
});

const Tops = (props) => {
    key = props.index;

    return (
      <div className="itemBox">
        <p><strong>&nbsp;&nbsp;{props.topName}</strong></p>
        <p>&nbsp;&nbsp;{props.topColor}</p>
        <p>&nbsp;&nbsp;{props.imgUrl}</p>{/* need to add img styling*/}
        <div className="itemButton">
          <input className="selectItemButton" onClick={() => props.tryOnTop(props.topId)} type="Submit" value="Try it on" readOnly/>
          <input className="deleteItemButton" onClick={() => props.deleteTop(props.topId)} type="Submit" value="Delete" readOnly/>
        </div>
      </div>
    );};

export default connect(mapStateToProps, mapDispatchToProps) (Tops);

