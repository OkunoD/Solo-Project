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
import { ForecastModal } from './ForecastModal.jsx';
import { mockWeather, mockForecast } from '../../mockData.js';


export const Search = ({ onSearchChange }) => {

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
    const [showForecast, setShowForecast] = useState(false);
    const [showSearch, setShowSearch] = useState(true);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            setCurrentWeather(mockWeather);
            setForecast(mockForecast);
        }

        const handleScroll = () => {
            const scrollThreshold = 63; 
            if (window.scrollY >= scrollThreshold) {
              setIsSticky(true);
            } else {
              setIsSticky(false);
            }
          };
          window.addEventListener('scroll', handleScroll);
      
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }, []);

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
                // searchData.label.split(", ")[0] gets just city w/out regions/country

                setCurrentWeather({ city: searchData.label.split(", ")[0], ...currentWeatherObj })
                setForecast({ city: searchData.label.split(", ")[0], ...forecastObj })

            })
            .catch((error) => {
                console.log('there was an error in weatherfetching')
                console.error(error)
            })
    }

    console.log("currentWeatherJson", JSON.stringify(currentWeather));
    console.log("forecastJson", JSON.stringify(forecast));


    // console.log("props.data", props.data);
    // console.log("data", data);

    const handleOnSearchChange = async (searchData) => {
        console.log(searchData);
        const [lat, lon] = searchData.value.split(" ");
        await fetchWeather(lat, lon, searchData);
        setShowSearch(false);
    }

    return (
        <>
        <div className={`${isSticky ? 'weather-spacer-and-modal-sticky' : 'weather-spacer-and-modal'}`}>
                <div className="weather">
                    {currentWeather &&
                        <div className="weather-modal">
                            <div className="city-and-description-div">
                                <p className="city">{currentWeather.city}
                                    {/* <button className="show-city-search-button" onClick={() => setShowSearch(!showSearch)}>v</button> */}
                                </p>
                                <div className="description-and-dropdown">
                                    <p className="weather-description">{currentWeather.weather[0].description}</p>
                                    <button className="show-city-search-button" onClick={() => setShowSearch(!showSearch)}>
                                        <img className="dropdown-button-img" src="icons/dropdown_button.png"></img>
                                    </button>
                                </div>

                            </div>
                            <div>
                                <div className="top">
                                    <div>

                                        <div className="icon-and-temperature">
                                            <img alt="weather" className="weather-icon" src={`icons/${currentWeather.weather[0].icon}.png`} />
                                            <p className="temperature">{Math.round(currentWeather.main.temp)}</p>
                                            <span className="degrees-symbol">°F</span>
                                        </div>

                                    </div>

                                    <div className="details">
                                        <div className="parameter-row">
                                            <span className="parameter-label">Feels Like</span>
                                            <span className="parameter-value">{Math.round(currentWeather.main.feels_like)}°F</span>
                                        </div>
                                        <div className="parameter-row">
                                            <span className="parameter-label">Wind</span>
                                            <span className="parameter-value">{currentWeather.wind.speed} M/S</span>
                                        </div>
                                        <div className="parameter-row">
                                            <span className="parameter-label">Humidity</span>
                                            <span className="parameter-value">{currentWeather.main.humidity}%</span>
                                        </div>
                                        <div className="forecast-spacer"></div>
                                        <span className="show-forecast-button"
                                            onClick={() => { setShowForecast(!showForecast) }}>Show Forecast</span>

                                    </div>


                                </div>

                            </div>
                        </div>
                    }
                    {(showForecast && forecast) && <ForecastModal data={forecast} />}
                </div>
                            <div className="city-search-bar">
                            {showSearch && <Search
                                onSearchChange={handleOnSearchChange}
                            />}
                            </div>
            </div>
        </>
    )
}