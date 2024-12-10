import React from "react";
import "./WeatherDisplay.css";

function WeatherDisplay({ weatherData }) {
  return (
    <div className="weather-container">
      <h2>{weatherData.name}</h2>
      <p>
        <strong>Temperature:</strong> {weatherData.temp}°C
      </p>
      <p>
        <strong>Condition:</strong> {weatherData.description}
      </p>
      <p>
        <strong>Wind Speed:</strong> {weatherData.windSpeed} m/s
      </p>
    </div>
  );
}

export default WeatherDisplay;
