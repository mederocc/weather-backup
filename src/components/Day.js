import React from "react";
import classes from "./Day.module.css";
import * as icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleFaIcon } from "../utils/faIcon";
import { weatherIcons } from "../utils/weatherCodes";

const Day = ({ day, max, min, weatherCode, weather }) => {
  const faIconKey = handleFaIcon(weather, weatherCode);
  // console.log(weather);

  return (
    <>
      <div className={classes["day-container"]}>
        <p>{day.slice(0, 3)}</p>
        <div style={{ fontSize: "3rem", color: "white", opacity: "70%" }}>
          <FontAwesomeIcon icon={icons[weatherIcons[faIconKey]]} />
        </div>
        <p>{min}ºC</p>
        <p>{max}ºC</p>
        {/* <div>bar</div> */}
      </div>
    </>
  );
};

export default Day;
