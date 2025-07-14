import { useState } from 'react';
import './Searchform.css'; 
import WeatherForecast from './WeatherForecast';
import '../utils/api'




const SearchForm = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState({ occurred: false, message: '' });

const handleSearch = async (event) => {
  event.preventDefault();
      setIsLoading(true);
  try {
    setError({ occurred: false, message: '' }); // Reset error state
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`);
    
    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    setWeatherData(data);
    setCity(searchTerm.trim());
  } catch (err) {
    setError({ occurred: true, message: err.message });
  }finally {
      setIsLoading(false); // Always stop loading state
    }
};
const api = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

return (
  
  <div className="container">
   
    <form onSubmit={handleSearch}>
       <div className='search-form'>
        <input className='search-input'
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        
        placeholder="Enter city name"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="search-button"
      >
        {isLoading ? (
          <svg
            className="spinner"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className='spinner'
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="pl-3.5"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          'Search'
        )}
      </button>
       </div>

    </form>

    {error.occurred && (
      <div className="error-message">
        {error.message}
      </div>
    )}
    {weatherData && (
  <div className='Data'>
    <h2>{weatherData.name}</h2>
    <p>Temperature: {weatherData.main.temp}°C</p>
    <p>Weather: {weatherData.weather[0].description}</p>
    <WeatherForecast city={city} />
  
  </div>
)}


  </div>

);
};

export default SearchForm;

