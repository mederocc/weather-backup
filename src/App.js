import { useState, useEffect, useCallback } from "react";
import classes from "./App.module.css";
import WeatherCard from "./components/WeatherCard";
import TransitionWrapper from "./components/UI/TransitionWrapper";
import SearchBar from "./components/UI/SearchBar";

function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null); // Name from coords
  const [coords, setCoords] = useState(null); // Coords from name
  const [posError, setPosError] = useState(false);

  // GET TIMEZONE
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // GET LOCATION

  const handleWeather = useCallback(
    // It takes coordinates given by browser on mount. It can then take coords received from api on search.
    async (position) => {
      if (!position) return;
      //9.8694792
      // -83.7980749

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,weathercode&current_weather=true&timezone=${timeZone}`
      );

      setWeather(await response.json());

      const locationResponse = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
      );

      setLocation(await locationResponse.json());
    },
    [timeZone]
  );

  useEffect(() => {
    try {
      if (navigator.geolocation && !coords) {
        navigator.geolocation.getCurrentPosition(handleWeather);
      }
    } catch (error) {
      setPosError(true);
    }
  }, [handleWeather, coords]);

  const handleLocation = async (location) => {
    let response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location.replace(
        " ",
        "%20"
      )}&limit=1&appid=ced421fdfdce066f5456cd1ffef46304`
    );
    response = await response.json();
    // formatting this way so I can reuse handleWeather as is.

    setCoords({
      coords: { latitude: response[0].lat, longitude: response[0].lon },
    });
  };

  useEffect(() => {
    handleWeather(coords);
  }, [coords, handleWeather]);

  return (
    <div className={classes["app-container"]}>
      {weather && location ? (
        <div className={classes.header}>
          <h1>WEATHER APP</h1>
          <SearchBar handleLocation={handleLocation} />
        </div>
      ) : (
        ""
      )}

      {weather && location && (
        <TransitionWrapper>
          <WeatherCard weather={weather} location={location.address.city} />
        </TransitionWrapper>
      )}
      {!weather || !location ? (
        <TransitionWrapper>
          <div className={classes.loading}>
            <img
              src="https://i.pinimg.com/originals/0e/f3/bb/0ef3bb66d9216fffcea9022628f7bb26.gif"
              alt="loading"
            />
          </div>
        </TransitionWrapper>
      ) : (
        ""
      )}

      {posError && !location && (
        <TransitionWrapper>
          <div className={classes.loading}>
            <img
              src="https://i.pinimg.com/originals/0e/f3/bb/0ef3bb66d9216fffcea9022628f7bb26.gif"
              alt="loading"
            />
          </div>
        </TransitionWrapper>
      )}
    </div>
  );
}

export default App;
