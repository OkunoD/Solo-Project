import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import JacketsCard from './JacketsCard.jsx';
import ItemCard from './ItemCard.jsx';
import { AsyncPaginate } from 'react-select-async-paginate';
import {
    openAlert,
    closeAlert,
    randomizeOutfitActionCreator,
    clearOutfitActionCreator,
    lockItemActionCreator
} from '../actions/actions.js'
import { geoApiOptions, geoApiUrl } from '../apis/apis.js';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const ForecastModal = ({ data }) => {

    const dayOfWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayOfWeek, WEEK_DAYS.LENGTH).concat(WEEK_DAYS.slice(0, dayOfWeek));

    return (
        <>
            <label className="title"></label>
            <Accordion allowZeroExpanded>
                {data.list.splice(0, 7).map((item, index) => (
                    <AccordionItem key={index}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img alt="weather" className="icon-small" src={`icons/${item.weather[0].icon}.png`}></img>
                                    <label className="day">{forecastDays[index]}</label>
                                    <label className="descriptionn">{item.weather[0].description}</label>
                                    <label className="min-max">{Math.round(item.main.temp_min)}°F / {Math.round(item.main.temp_max)}°F</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="daily-details-grid">
                                <div className="daily-details-grid-item">
                                    <label>Feels Like:</label>
                                    <label>{Math.round(item.main.feels_like)}°F</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Humidity</label>
                                    <label>{item.main.humidity}</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Clouds</label>
                                    <label>{item.clouds.all}%</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Wind speed:</label>
                                    <label>{item.wind.speed}m/s</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Sea Level</label>
                                    <label>{item.main.sea_level}m</label>
                                </div>

                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    )
}