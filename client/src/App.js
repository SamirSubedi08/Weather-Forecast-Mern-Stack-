// src/App.js

import SearchForm from './components/Searchform';

import axios from 'axios';
import './App.css';
import WeatherDisplay from './components/WeatherDisplay';


function App() {
  const handleSearch = async (city) => {
    try {
    const response = await axios.post('http://localhost:5000/api/weather', { city: 'Kathmandu' });
      // Handle the response data here
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="App">
        <WeatherDisplay 
        /> 
  
      
    </div>
    
    </>

  );
}

export default App;