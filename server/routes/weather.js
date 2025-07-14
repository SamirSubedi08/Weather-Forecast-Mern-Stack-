const express = require('express');
const router = express.Router();
const axios = require('axios');
const cors = require('cors');


// ✅ Load environment variables
require('dotenv').config();
router.use(cors());
router.get('/weather', (req, res) => {
  res.send('Weather endpoint is working!');
});
router.post('/weather', async (req, res) => {
  const { city } = req.body;
  const API_KEY = process.env.API;
  console.log('Loaded API key:', API_KEY ? API_KEY.slice(0, 4) + '...' : 'NOT FOUND');

  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not found in environment variables' });
  }

  if (!city || typeof city !== 'string' || city.trim() === '') {
    return res.status(400).json({ error: 'City is required in the request body' });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    if (error.response) {
      // OpenWeatherMap API returned an error
      res.status(error.response.status).json({
        error: error.response.data.message || 'Failed to fetch weather data',
        details: error.response.data
      });
    } else {
      res.status(500).json({ error: error.message || 'Failed to fetch weather data' });
    }
  }
});

module.exports = router;
