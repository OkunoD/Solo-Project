import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addJacketActionCreator, deleteJacketActionCreator, tryOnJacketActionCreator } from '../actions/actions.js'
import './styles.css'; 

// let key = undefined;

const mapStateToProps = function(state, ownProps) {
  return {
    id: ownProps.id,
    name: ownProps.name,
    color: ownProps.color,
    imgUrl: ownProps.imgUrl,
  };
};

const mapDispatchToProps = (dispatch) => ({
});

const Item = (props) => {
    // key = props.index;
    console.log('in Item, props.id is:', props.id);
    console.log('in Item, props.name is:', props.name);
    console.log('in Item, props.color is:', props.color);
    console.log('in Item, props.imgUrl is:', props.imgUrl);

    return (
      <div className="itemBox">
        <p><strong>&nbsp;&nbsp;{props.name}</strong></p>
        <p>&nbsp;&nbsp;{props.color}</p>
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

