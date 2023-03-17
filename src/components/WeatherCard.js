import React from "react";
import classes from "./WeatherCard.module.css";
import WeatherNow from "./WeatherNow";
import Forecast from "./Forecast";
import { weatherCodes, weatherIcons } from "../utils/weatherCodes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleFaIcon } from "../utils/faIcon";
import * as icons from "@fortawesome/free-solid-svg-icons";

const WeatherCard = ({ weather, location }) => {
  const faIconKey = handleFaIcon(weather);

  return (
    <div className={classes["weather-card"]}>
      <WeatherNow
        weather={weather}
        location={location}
        weatherCodes={weatherCodes}
      >
        <div style={{ fontSize: "7rem", color: "white", opacity: "80%" }}>
          <FontAwesomeIcon icon={icons[weatherIcons[faIconKey]]} />
        </div>
      </WeatherNow>

      <Forecast weather={weather} />
    </div>
  );
};

export default WeatherCard;
