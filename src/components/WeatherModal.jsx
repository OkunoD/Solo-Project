import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import JacketsCard from './JacketsCard.jsx';
import ItemCard from './ItemCard.jsx';
import { 
    openAlert, 
    closeAlert, 
    randomizeOutfitActionCreator, 
    clearOutfitActionCreator,
    lockItemActionCreator
 } from '../actions/actions.js'

 export const WeatherModal = (props) => {
    const [data, setData] = useState(props.data);
    return (
        <div className="weather-modal">
            <h1>weather!</h1>
            <p>{data}</p>
        </div>
    )
 }