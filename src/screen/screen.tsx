import { Dispatch, SetStateAction, useState } from "react";
import React from 'react';
import Charts from "../components/charts/charts.tsx";
import SearchBar from "../components/searchBar/searchBar.tsx";



const Screen = () => {
    const [currentCity, setCurrentCity] = useState<string>("delhi");
    const [cityName, setCityName] = useState<string[]>([])
    const [display, setDisplay] = useState<boolean>(false)

    const toggleRecentCities = () => {
        setDisplay(!display);
    };


    return (
        <div className="container">
            <header className="header-content">
                <div className="heading">
                    <h1>GetWeather</h1>
                </div>
                <div className="recent-cities">
                    <button
                        className='drop-btn'
                        onClick={toggleRecentCities}>
                        Recent search</button>
                    {display && (
                        <ul className='dropdown-content'>
                            {cityName.map((city, index) => (
                                <li key={index}>{city}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </header>
            <img className="hero-img" src={require("../assets/hero.jpg")} alt="" />
            <SearchBar setCurrentCity={setCurrentCity} setCityName={setCityName as Dispatch<SetStateAction<string[]>>} />
            <Charts currentCity={currentCity} />
        </div>
    )
}

export default Screen; 
