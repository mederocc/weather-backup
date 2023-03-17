import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const SearchBar = ({ handleLocation }) => {
  // PLACE TO COORDS
  //https://api.openweathermap.org/geo/1.0/direct?q=buenos%20aires&limit=1&appid=ced421fdfdce066f5456cd1ffef46304

  const [input, setInput] = useState("");

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleLocation(e.target.value);
      setInput("");
    }
  };

  return (
    <TextField
      id="filled-search"
      type="search"
      variant="filled"
      onChange={(e) => {
        setInput(e.target.value);
      }}
      value={input}
      onKeyDown={handleEnter}
      label="Try a different location"
      style={{
        "::placeholder": {
          padding: "1rem",
        },
        width: "20rem",
        marginTop: "1.5rem",
        // opacity: "70%",
        backgroundColor: "rgb(249, 249, 249)",
        borderRadius: "0.2rem",
        overflow: "hidden",
      }}
    />
  );
};

export default SearchBar;
