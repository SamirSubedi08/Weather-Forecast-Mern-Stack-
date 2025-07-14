// src/utils/api.js
const API_KEY = process.env.API;

export const getWeatherForecast = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch forecast');
    }
    const data = await response.json();
    return data.list;
  } catch (error) {
    throw error;
  }
};