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
    const [data, setData] = useState(props.data);
    useEffect(()=> {
        setData(props.data);
        console.log({data});
        // console.log({});

    },[])

    console.log("props.data", props.data);
    console.log("data", data);

    const handleOnSearchChange = (searchData) => {
        console.log(searchData);
    }


    return (
        <div className="weather-modal">
            <Search 
                onSearchChange={handleOnSearchChange}
            />
            <h1>weather!</h1>
            <p>{data.weather[0].id}</p>
        </div>
    )
 }