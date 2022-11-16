import React from 'react';
import { connect } from 'react-redux';
import { addHeadwearctionCreator, removeHeadwearActionCreator } from '../actions/actions.js'

let key = undefined;

const Headwear = props => {
    key = props.index;

    return (
      <div style={{border: '1px solid', borderRadius: '2px'}} className="headwearBox">
        <p><strong> Id: </strong>{props.lastMarketId}</p>
        <p><strong>Location: </strong>{props.location}</p>
        <p><strong>Cards: </strong>{props.cards}</p>
      </div>
    );};


