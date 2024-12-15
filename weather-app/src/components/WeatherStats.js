import React from 'react';
import './WeatherStats.css';

function WeatherStats({ stats }) {
  return (
    <div className="weather-stats">
      <h3>Weather Statistics</h3>
      <p>Humidity: {stats.humidity}%</p>
      <p>Pressure: {stats.pressure} hPa</p>
    </div>
  );
}

export default WeatherStats;
