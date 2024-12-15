import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherDisplay from "./components/WeatherDisplay";
import WeatherStats from "./components/WeatherStats";
import WeatherForecast from "./components/WeatherForecast";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeatherData = async () => {
    setLoading(true);
    setError("");
    try {
      const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
      const geocodingResponse = await fetch(geocodingUrl);
      const geocodingData = await geocodingResponse.json();

      if (geocodingData.results && geocodingData.results.length > 0) {
        const { latitude, longitude, name } = geocodingData.results[0];

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        if (weatherData) {
          setWeatherData({
            name,
            temp: weatherData.current_weather.temperature,
            description: `Weather Code: ${weatherData.current_weather.weathercode}`,
            windSpeed: weatherData.current_weather.windspeed,
          });

          const forecast = weatherData.daily.temperature_2m_max.map((maxTemp, index) => ({
            date: weatherData.daily.time[index],
            condition: "Sunny", // Placeholder, as Open-Meteo doesn't provide detailed conditions
            temp: maxTemp,
          }));
          setForecastData(forecast);
        } else {
          setError("Weather data not found.");
        }
      } else {
        setError("City not found. Please check the spelling and try again.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("An error occurred while fetching weather data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }
    fetchWeatherData();
  };

  useEffect(() => {
    if (weatherData) {
      console.log("Weather data updated:", weatherData);
    }
  }, [weatherData]);

  return (
    <div className="App">
      <header className="header">
        <h1>Weather App</h1>
        <p>Check current weather and a 7-day forecast for your city!</p>
      </header>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Get Weather</button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {weatherData && <WeatherDisplay weatherData={weatherData} />}
        {forecastData.length > 0 && <WeatherForecast forecast={forecastData} />}
      </div>
      <footer className="footer">
        Data provided by{" "}
        <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">
          Open-Meteo API
        </a>
      </footer>
    </div>
  );
}

export default App;
