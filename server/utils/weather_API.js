require('dotenv').config();
const axios = require('axios');
const API_KEY = process.env.API;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getWeatherData = async (city) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

async function getForecast(city) {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        units: 'metric',
        appId: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
}

module.exports = {
  getCurrentWeather,
  getForecast
};