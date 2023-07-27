import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [place, setPlace] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.request({
        method: "GET",
        url: "https://weatherapi-com.p.rapidapi.com/current.json",
        params: { q: place },
        headers: {
          "X-RapidAPI-Key":
            "7febdc400dmsh311aeb988567eccp1204b2jsne4b1306a65c2",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      });
      console.log(response.data);
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      console.log("Error fetching weather data: ", error);
      setWeatherData(null);
      setError("An error occurred while fetching weather data. Check the city you entered.");
    }
  };

  return (
    <div className="weather-container">
      <form onSubmit={getWeather} className="weather-form">
        <input
          type="text"
          placeholder="Enter a city"
          onChange={(event) => setPlace(event.currentTarget.value)}
        />
        <button>Submit</button>
      </form>
      {error && <div className="error-message">{error}</div>}{" "}
      {weatherData && (
        <div className="weather-info">
          <h2>Weather Information for {weatherData.location.name}</h2>
          <p>Country: {weatherData.location.country}</p>
          <p>Region: {weatherData.location.region}</p>
          <p>Local Time: {weatherData.location.localtime}</p>

          <h3>Current Conditions</h3>
          <p>Temperature: {weatherData.current.temp_c} °C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <img
            src={weatherData.current.condition.icon}
            alt="Weather Icon"
            className="weather-icon"
          />

          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>
            Wind: {weatherData.current.wind_kph} km/h,{" "}
            {weatherData.current.wind_dir}
          </p>
          <p>UV Index: {weatherData.current.uv}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
