import { useState } from 'react';
import axios from 'axios';
import './searchBar.css';


const SearchBar = ({ search, setSearch, setCurrentCity }) => {

    const [data, setData] = useState("")
    const [cityName, setCityName] = useState([])

    const [temperatureUnit, setTemperatureUnit] = useState("celsius");
    const [display, setDisplay] = useState(false)
    let date = new Date();
    const options = {
        weekday: 'long',
        //  year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formattedDate = date.toLocaleDateString('en-US', options);

    let api_key1 = "a882ffaad1641b85d7c373a0bdaea292"



    const searchFunc = async () => {

        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=Metric&appid=${api_key1}`)
            .then(res => {
                if (search?.length === 0) {
                    window.alert("enter correct city name")
                }
                else {

                    setCurrentCity(res?.data?.name)
                    console.log("res", res?.data)
                    setData(res?.data)

                    // Add the city to the recentCities array
                    setCityName((prevCities) => {
                        const updatedCities = [res?.data?.name, ...prevCities.slice(0, 4)];
                        return updatedCities;
                    });
                    console.log("last city", cityName)
                }
            })
            .catch(err => {
                console.log("error", err)
                window.alert("enter correct city name")
            });

    }
    const convertToCelsius = (temperature) => {
        return Math.round(temperature);
    };

    const convertToFahrenheit = (temperature) => {
        return Math.round((temperature * 9) / 5 + 32);
    };

    const TemperatureInputFunc = (e) => {
        setTemperatureUnit(e.target.value);
    };

    const getTemp = () => {
        const temperature = data?.main?.temp;
        return temperatureUnit === "celsius"
            ? `${convertToCelsius(temperature)} °C`
            : `${convertToFahrenheit(temperature)} °F`;

    };

    const toggleRecentCities = () => {
        setDisplay(!display);
    };


    return (
        <>
            <div className="content">
                <div className="search-input">
                    <input type="text" placeholder='weather in your city' onChange={(e) => { setSearch(e?.target?.value) }} value={search} />
                    <button onClick={() => { searchFunc() }}>Search</button>
                </div>
                <div className="temp-opt">
                    <label> <input
                        name="temperature"
                        type="radio"
                        value="celsius"
                        checked={temperatureUnit === "celsius"}
                        onChange={TemperatureInputFunc}
                    /> Celsius &deg;C</label>
                    <label><input
                        name="temperature"
                        type="radio"
                        value="fahrenheit"
                        checked={temperatureUnit === "fahrenheit"}
                        onChange={TemperatureInputFunc}
                    /> Fahrenheit &deg;F</label>
                </div>
                <div className="recent-cities">
                    <p onClick={toggleRecentCities}>Recent search</p>
                    {display && (<ul>
                        {cityName.map((city, index) => (
                            <li key={index}>{city}</li>
                        ))}
                    </ul>
                    )}
                </div>
            </div>
            <div className="city-temp">

                <div className="city-details">
                    <div className="weather-data">
                        <div className="temp-data">
                            <p className='city'>
                                {data?.name ? data?.name : "City"}
                            </p>
                            <p className=''>
                                {data?.sys?.country}
                            </p>
                            <p>{formattedDate}</p>
                            <p>Temperature:
                                {(getTemp() !== NaN) ? `10C` : getTemp()}
                            </p>
                        </div>

                        <div className="temp-data">
                            <p className='weather'>Weather</p>
                            <p>{formattedDate}</p>
                            <p>
                                {data?.weather ? data?.weather[0]?.main : ""}
                            </p>
                        </div>
                    </div>
                    <div className="more-data">
                        <p className="humidity">Humidity :
                            {data?.main?.humidity}
                            %</p>
                        <p>Wind Speed :
                            {data?.wind?.speed}
                            km/h</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SearchBar; 