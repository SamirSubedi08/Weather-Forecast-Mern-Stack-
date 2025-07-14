const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

export const getWeatherForecast = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch forecast');
    }

    const data = await response.json();

    // Extract one forecast per day (every 8th item)
    const dailyData = [];
    const seenDates = new Set();

    for (let i = 0; i < data.list.length; i++) {
      const item = data.list[i];
      const date = new Date(item.dt_txt).toDateString();

      if (!seenDates.has(date)) {
        seenDates.add(date);

        dailyData.push({
          dt: item.dt,
          temp: { day: item.main.temp },
          weather: item.weather,
        });
      }

      // Only keep 5 days
      if (dailyData.length === 5) break;
    }

    return dailyData;
  } catch (error) {
    throw error;
  }
};
