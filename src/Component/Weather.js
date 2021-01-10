import React, { useState } from "react";
import { render } from "react-dom";
import axios from "axios";
import './Weather.css';

export const Weather = () => {
    const [city, setCity] = useState("Seoul");
    const [country, setCountry] = useState("KR");
    const [icon, setIcon] = useState("");
    const [weather, setWeather] = useState("");
    const [temperature, setTemperature] = useState("");



    const getWeather = (city, country) => {
        axios({
            method: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=b66cdacea33195a546691102131e54b8`,
        })
            .then((response) => {
                setTemperature(response.data.main.temp - 273.15);
                setWeather(response.data.weather[0].main);
                setIcon(response.data.weather[0].icon);
            })
    };

    return (
        <>
            <div>
                <div className="Mainbar">Weather</div>
                <div className="Content">
                    <img src={"http://openweathermap.org/img/w/" + icon + ".png"} alt={"weather"} />
                    <div className="text">
                        {city}
                        <br />
                        {Math.round(temperature * 100) / 100} ℃  {weather}
                        <br />
                        {new Date().toLocaleString()}
                    </div>
                    <label>City
                        <input type="text" value={city}
                               onChange={(e) => setCity(e.target.value)} />
                    </label>
                    <label>Country
                        <input type="text" value={country}
                               onChange={(e) => setCountry(e.target.value)} />
                    </label>
                    <button onClick={() => {
                        getWeather(city, country);
                    }}>
                        Get Weather!
                    </button>
                </div>
            </div>
        </>
    );
};

render(<Weather />, document.querySelector("#root"));
