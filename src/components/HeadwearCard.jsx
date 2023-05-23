import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addHeadwearctionCreator, deleteHeadwearActionCreator, tryOnHeadwearActionCreator } from '../actions/actions.js'
import './styles.css'; 

let key = undefined;

const mapStateToProps = function(state, ownProps) {
  return {
    headwearId: state.headwearList[ownProps.index].id,
    headwearName: state.headwearList[ownProps.index].name,
    headwearColor: state.headwearList[ownProps.index].color,
    imgUrl: state.headwearList[ownProps.index].imgUrl,
    //state below comment not needed
    headwearList: state.headwearList,
    ownProps: ownProps,
    randomNum: 299,
    selectedHeadwear: state.selectedHeadwear,
  };
};

const mapDispatchToProps = (dispatch) => ({
  tryOnHeadwear : (payload) => dispatch(tryOnHeadwearActionCreator(payload)),
  deleteHeadwear : (payload) => dispatch(deleteHeadwearActionCreator(payload)),
});

const Headwear = (props) => {
    key = props.index;

    return (
      <div className="itemBox">
        <p><strong>&nbsp;&nbsp;{props.headwearName}</strong></p>
        <p>&nbsp;&nbsp;{props.headwearColor}</p>
        <p>&nbsp;&nbsp;{props.imgUrl}</p>{/* need to add img styling*/}
        <div className="itemButton">
          <input className="selectItemButton" onClick={() => {
            console.log('tryon input received');
            props.tryOnHeadwear(props.headwearId)}} type="Submit" value="Try it on" readOnly/>
          <input className="deleteItemButton" onClick={() => {
            props.deleteHeadwear(props.headwearId)}} type="Submit" value="Delete" readOnly/>
        </div>
      </div>
    );};

export default connect(mapStateToProps, mapDispatchToProps) (Headwear);

