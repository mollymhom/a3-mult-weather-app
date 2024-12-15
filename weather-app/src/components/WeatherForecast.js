import React from 'react';
import './WeatherForecast.css';

function WeatherForecast({ forecast }) {
  return (
    <div className="weather-forecast">
      <h3>7-Day Forecast</h3>
      <ul>
        {forecast.map((day, index) => (
          <li key={index}>
            <strong>{day.date}</strong>: {day.condition}, {day.temp}°C
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeatherForecast;
