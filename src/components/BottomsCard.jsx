import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteItemActionCreator, tryOnItemActionCreator } from '../actions/actions.js'
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
  tryOnItem : (payload1, payload2, payload3) => dispatch(tryOnItemActionCreator(payload1, payload2, payload3)),
  deleteItem : (payload1, payload2) => dispatch(deleteItemActionCreator(payload1, payload2)),
});

const Bottoms = (props) => {
    key = props.index;

    return (
      <div className="itemBox">
        <p><strong>&nbsp;&nbsp;{props.bottomName}</strong></p>
        <p>&nbsp;&nbsp;{props.bottomColor}</p>
        <p>&nbsp;&nbsp;{props.imgUrl}</p>{/* need to add img styling*/}
        <div className="itemButton">
        <input className="selectItemButton" onClick={() => {
            console.log('tryon input received');
            props.tryOnItem('bottoms', props.bottomId, 'Bottom')}} type="Submit" value="Try it on" readOnly/>
          <input className="deleteItemButton" onClick={() => {
            props.deleteItem('bottoms', props.bottomId)}} type="Submit" value="Delete" readOnly/>
        </div>
      </div>
    );};

export default connect(mapStateToProps, mapDispatchToProps) (Bottoms);