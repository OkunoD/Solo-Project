import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteItemActionCreator, tryOnItemActionCreator } from '../actions/actions.js'
import './styles.css'; 

let key = undefined;

const mapStateToProps = function(state, ownProps) {
  return {
    shoesId: state.shoesList[ownProps.index].id,
    shoesName: state.shoesList[ownProps.index].name,
    shoesColor: state.shoesList[ownProps.index].color,
    imgUrl: state.shoesList[ownProps.index].imgUrl
  };
};

const mapDispatchToProps = (dispatch) => ({
  tryOnItem : (payload1, payload2, payload3) => dispatch(tryOnItemActionCreator(payload1, payload2, payload3)),
  deleteItem : (payload1, payload2) => dispatch(deleteItemActionCreator(payload1, payload2)),
});

const Shoes = (props) => {
    key = props.index;

    return (
      <div className="itemBox">
        <p><strong>&nbsp;&nbsp;{props.shoesName}</strong></p>
        <p>&nbsp;&nbsp;{props.shoesColor}</p>
        <p>&nbsp;&nbsp;{props.imgUrl}</p>{/* need to add img styling*/}
        <div className="itemButton">
        <input className="selectItemButton" onClick={() => {
            console.log('tryon input received');
            props.tryOnItem('shoes', props.shoesId, 'Shoes')}} type="Submit" value="Try it on" readOnly/>
          <input className="deleteItemButton" onClick={() => {
            props.deleteItem('shoes', props.shoesId)}} type="Submit" value="Delete" readOnly/>
        </div>
      </div>
    );};

export default connect(mapStateToProps, mapDispatchToProps) (Shoes);