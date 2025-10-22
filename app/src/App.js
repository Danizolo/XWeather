/**
 * @description      :
 * @author           : DHANUSH
 * @group            :
 * @created          : 22/10/2025 - 09:26:01
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 22/10/2025
 * - Author          : DHANUSH
 * - Modification    :
 **/
import "./App.css";
import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setWeather(null);

    try {
      const apiKey = "dc2d1988397a46c4bcb125325252010";
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );

      if (!response.ok) {
        alert("Failed to fetch Data");
        return;
      }

      const data = await response.json();
      setWeather({
        location: `${data.location.name}, ${data.location.country}`,
        temperature: data.current.temp_c,
        humidity: data.current.humidity,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        windSpeed: data.current.wind_kph,
      });
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="App">
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Weather App</h2>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={fetchWeather}>Search</button>

        {loading && <p>Loading data...</p>}

        {weather && (
          <div className="weather-cards" style={{ marginTop: "20px" }}>
            <div className="weather-card">
              <h3>Temperature</h3>
              <p>{weather.temperature}°C</p>
            </div>
            <div className="weather-card">
              <h3>Humidity</h3>
              <p>{weather.humidity}%</p>
            </div>
            <div className="weather-card">
              <h3>Condition</h3>
              <p>{weather.condition}</p>
            </div>
            <div className="weather-card">
              <h3>Wind Speed</h3>
              <p>{weather.windSpeed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
