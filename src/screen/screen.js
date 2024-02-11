import { useState } from "react";
import Charts from "../components/charts/charts";
import SearchBar from "../components/searchBar/searchBar";


const Screen = () => {
    const [search, setSearch] = useState("");
    const [currentCity, setCurrentCity] = useState("")


    return (
        <div className="container">
            <header className="header-content">
                <div className="heading">
                    <h1>GetWeather</h1>
                </div>
            </header>
            <img className="hero-img" src={require("../assets/hero.jpg")} alt="" />
            <SearchBar search={search} setSearch={setSearch} setCurrentCity={setCurrentCity} />
            <Charts search={search} setSearch={setSearch} currentCity={currentCity} />
        </div>
    )
}

export default Screen; 
