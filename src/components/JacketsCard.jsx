import React, { useState } from 'react';
import { connect } from 'react-redux';
// import
import { deleteItemActionCreator, tryOnItemActionCreator } from '../actions/actions.js'
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
  tryOnItem : (payload1, payload2, payload3) => dispatch(tryOnItemActionCreator(payload1, payload2, payload3)),
  deleteItem : (payload1, payload2) => dispatch(deleteItemActionCreator(payload1, payload2)),
});

const Jackets = (props) => {
    key = props.index;

    return (
      <div className="itemBox">
        <p><strong>&nbsp;&nbsp;{props.jacketName}</strong></p>
        <p>&nbsp;&nbsp;{props.jacketColor}</p>
        <p>&nbsp;&nbsp;{props.imgUrl}</p>{/* need to add img styling*/}
        <div className="itemButton">
          <input className="selectItemButton" onClick={() => {
            console.log('tryon input received');
            console.log('jacketId is: ', props.jacketId);
            props.tryOnItem('jackets', props.jacketId, 'Jacket')}} type="Submit" value="Try it on" readOnly/>
          <input className="deleteItemButton" onClick={() => {
            console.log('delete input received');
            props.deleteItem('jackets', props.jacketId)}} type="Submit" value="Delete" readOnly/>
        </div>
      </div>
    );};

export default connect(mapStateToProps, mapDispatchToProps) (Jackets);

