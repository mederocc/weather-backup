// Takes weather response from open-meteo api as parameter

export const handleFaIcon = (weather, dailyWeatherCode) => {
  let timeOfDay;

  const now = new Date();

  const sunrise = new Date(weather.daily.sunrise[0]);

  const sunset = new Date(weather.daily.sunset[0]);

  const weatherCode = dailyWeatherCode
    ? dailyWeatherCode
    : weather.current_weather.weathercode;

  // Compare the current time with the sunset time
  if (now <= sunrise) {
    timeOfDay = "night";
  } else if (now >= sunrise && now >= sunset) {
    timeOfDay = "night";
  } else {
    timeOfDay = "day";
  }

  let faIconKey = "";

  // Icons for weather codes 0 through 3 have day and night variations
  if (weatherCode >= 0 && weatherCode <= 3) {
    faIconKey = `${weatherCode}-${timeOfDay}`;
  } else {
    faIconKey = weatherCode;
  }
  return faIconKey;
};
