import { useState } from 'react';
import axios from 'axios';
import './searchBar.css';


const SearchBar = ({ setCurrentCity, cityName, setCityName, display, setDisplay }) => {

    const [data, setData] = useState("")
    // const [cityName, setCityName] = useState([])
    // const [display, setDisplay] = useState(false)
    const [search, setSearch] = useState("")
    const [temperatureUnit, setTemperatureUnit] = useState("celsius");
    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };
    
    let date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', options);
    let api_key1 = "b0842bad6e5cb89733c63d666132f4d0"

    const searchFunc = async () => {

        //to get weather report of partucular city
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=Metric&appid=${api_key1}`)
            .then(res => {
                if (search?.length === 0) {
                    window.alert("Enter the correct City. ")
                }
                else {
                    setCurrentCity(res?.data?.name)
                    setData(res?.data)

                    // Add the city to the recentCities array
                    setCityName((prevCities) => {
                        const recentCities = [res?.data?.name, ...prevCities.slice(0, 4)];
                        return recentCities;
                    });
                    // console.log("last city searched", cityName)
                }
            })
            .catch(err => {
                window.alert("Enter the correct City. ")
            });

    }

    const convertToCelsius = (temperature) => {
        return Math.round(temperature);
    };

    const convertToFahrenheit = (temperature) => {
        return Math.round(((temperature * 9) / 5) + 32);
    };

    const TemperatureInputFunc = (e) => {
        setTemperatureUnit(e.target.value);
    };

    const getTemp = () => {
        const temperature = data?.main?.temp;
        const isTemperatureValid = !isNaN(temperature);

        if (isTemperatureValid) {
            return temperatureUnit === "celsius"
                ? `${convertToCelsius(temperature)} °C`
                : `${convertToFahrenheit(temperature)} °F`;
        } else {
            return "_";
        }
    };

   
    return (
        <>
            <div className="content">
                <div className="search-input">
                    <input
                        type="text"
                        placeholder='weather in your city'
                        onChange={(e) => { setSearch(e?.target?.value) }}
                        value={search} />
                    <button onClick={() => { searchFunc() }}>Search</button>
                </div>

                <div className="temp-opt">
                    <label onClick={TemperatureInputFunc}> 
                    <input
                        name="temperature"
                        type="radio"
                        value="celsius"
                        checked={temperatureUnit === "celsius"}
                        onChange={TemperatureInputFunc}
                    /> Celsius °C</label>
                    <label onClick={TemperatureInputFunc}>
                        <input
                        name="temperature"
                        type="radio"
                        value="fahrenheit"
                        checked={temperatureUnit === "fahrenheit"}
                        onChange={TemperatureInputFunc}
                    /> Fahrenheit °F</label>
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
                            <p>Temperature : {(getTemp() )}
                            </p>
                        </div>

                        <div className="temp-data">
                            <p className='weather'>Weather</p>
                            <p>{formattedDate}</p>
                            <p>{data?.weather ? data?.weather[0]?.main : ""} 
                            </p>
                        </div>
                    </div>

                    <div className="more-data">
                        <p className="humidity">Humidity : {data?.main?.humidity} %</p>
                        <p>Wind Speed : {data?.wind?.speed} km/h</p>
                    </div>

                </div>

            </div>
        </>
    )
}

export default SearchBar; 