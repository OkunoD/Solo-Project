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


 export const Search = ({onSearchChange}) => {

    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(`${geoApiUrl}/cities?minPopulation=100000&namePrefix=${inputValue}`, geoApiOptions);
            const result = await response.json();
            console.log(result);
            return {
                options: result.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.region}, ${city.countryCode}`,
                    }
                })
            }
        } catch (error) { 
            console.error(error);
        }
    }

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate
            placeholder="Search city"
            debounceTimeout={500}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
    
 } 

 export const WeatherModal = (props) => {

    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    useEffect(()=> {
        handleOnSearchChange({value: "20 20", label: "Pasadena"});
        console.log(currentWeather);
        console.log(forecast);
    },[])
        
    const fetchWeather = (lat, lon, searchData) => {
        console.log('inside fetchWeather called by Outfit useEffect')
        fetch(`/api/weather?param1=${lat}&param2=${lon}`)
        .then(async (response) => {
            const weatherJson = await response.json();
            const currentWeatherObj = await weatherJson[0];
            const forecastObj = await weatherJson[1];

            // const currentWeatherJson = await data.currentWeatherJson.json();
            // const forecastJson = await data.forecastJson.json();
            console.log('im at the response of fetch weather')
            console.log('weatherJson is', weatherJson)
            console.log("forecastObj is,", forecastObj);
            console.log("weatherObj is,", currentWeatherObj);
            // console.log('forecastJson  is', forecastJson)
            // const currentWeatherObj = await weatherJson[0];
            // const forecastObj = await weatherJson[1];
            setCurrentWeather({ city: searchData.label, ...currentWeatherObj})
            setForecast({ city: searchData.label, ...forecastObj})

        })
        .catch((error)=> {
            console.log('there was an error in weatherfetching')
            console.error(error)
        })
    }

    console.log(currentWeather);
    console.log(forecast);


    // console.log("props.data", props.data);
    // console.log("data", data);

    const handleOnSearchChange = async (searchData) => {
        console.log(searchData);
        const [lat, lon] = searchData.value.split(" ");
        await fetchWeather(lat, lon, searchData);

    }



    return (
        <div className="weather-modal">
            <Search 
                onSearchChange={handleOnSearchChange}
            />
            <div className="current-weather-div">
                <div className="city-and-description-div">
                    <p className="city">Pasadena</p>
                    <p className="weather-description">Sunny</p>
                </div>
            <img alt="weather" className="weather-icon" src="icons/01d.png" />
            </div>
            <div className="temperature-and-details-div">
                <p className="temperature">99 degreez</p>
                <div className="details">
                    <div className="details">
                        <div classname="parameter-row">
                            <span className="parameter-label">Details</span>
                        </div>
                        <div classname="parameter-row">
                            <span className="parameter-label">Feels Like</span>
                            <span className="parameter-value">22</span>
                        </div>
                        <div classname="parameter-row">
                            <span className="parameter-label">Wind</span>
                            <span className="parameter-value">22mph</span>
                        </div>
                        <div classname="parameter-row">
                            <span className="parameter-label">Humidity</span>
                            <span className="parameter-value">sweaty</span>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
 }