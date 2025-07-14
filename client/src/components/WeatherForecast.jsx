import { useState, useEffect } from 'react';
import { getWeatherForecast } from '../utils/api';
import { WiDaySunny, WiRain, WiCloudy, WiThunderstorm, WiCloud, WiRaindrop, WiRaindrops, WiCloudDown, WiNightCloudy, WiDayCloudyHigh, WiDayCloudyGusts } from 'react-icons/wi';
import './WeatherForecast.css';

const WeatherForecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let timeout; // ⏱ declare timeout variable

    const fetchForecast = async () => {
      try {
        const forecastData = await getWeatherForecast(city);
        setForecast(forecastData);
        setLoading(false);
        clearTimeout(timeout); // ✅ clear timeout if successful
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (city) {
      setLoading(true);
      fetchForecast();

      // ⏱ fallback timeout in case API hangs
      timeout = setTimeout(() => {
        setLoading(false);
        setError('Request timed out.');
      }, 7000);
    };

    return () => clearTimeout(timeout); // 🧹 cleanup
  }, [city]);

  const getWeatherIcon = (description) => {
    switch (description.toLowerCase()) {
      case 'overcast clouds':
        return <WiCloudy className="weather-icon" />;
      case 'light rain':
        return <WiRaindrops className="weather-icon" />;
      case 'broken clouds':
        return <WiDayCloudyGusts className="weather-icon" />;
      case 'thunderstorm':
        return <WiThunderstorm className="weather-icon" />;
      case 'moderate rain':
        return <WiThunderstorm className='weather-icon'/>;
      case 'scattered clouds':
        return <WiCloudy className='weather-icon'/>;
      default:
        return <WiDaySunny className="weather-icon" />;
    }
  };

  if (loading) {
    return (
      <div className="forecast-container">
        <h2>5-Day Forecast</h2>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="forecast-container">
        <h2>5-Day Forecast</h2>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="forecast-container">
      <h2>5-Day Forecast</h2>
      <div className="forecast-grid">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-card">
            <div className="day-header">
              <span className="day-name">{new Date(day.dt * 1000).toLocaleDateString()}</span>
            </div>
            <div className="weather-icon-container">
              {getWeatherIcon(day.weather[0].description)}
            </div>
            <div className="temperature">
              <span className="temp">{Math.round(day.temp.day)}°C</span>
            </div>
            <div className="weather-description">
              <span className="description">{day.weather[0].description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
