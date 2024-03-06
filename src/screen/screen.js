import { useState } from "react";
import Charts from "../components/charts/charts";
import SearchBar from "../components/searchBar/searchBar";
// import FiveDays from "../components/charts/fiveDays";


const Screen = () => {
    const [currentCity, setCurrentCity] = useState("delhi");
    const [cityName, setCityName] = useState([])
    const [display, setDisplay] = useState(false)

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
            <SearchBar setCurrentCity={setCurrentCity} setCityName={setCityName} />
            <Charts currentCity={currentCity} />
            {/* <FiveDays currentCity={currentCity} /> */}
        </div>
    )
}

export default Screen; 
