import React from "react";
import classes from "./WeatherNow.module.css";

const WeatherNow = ({ weather, location, weatherCodes, children }) => {
  const description = weatherCodes[weather.current_weather.weathercode];
  return (
    <div className={classes.background}>
      <div className={classes["current-container"]}>
        <p>{location}</p>
        <div>
          {children}
          <div className={classes["current-temp"]}>
            <p>{weather.current_weather.temperature} ºC</p>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherNow;
