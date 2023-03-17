import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import * as colors from "@mui/material/colors";

const CustomButton = ({ variant, color, text, handleClick }) => {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(colors[color][500]),
    backgroundColor: colors[color][500],
    "&:hover": {
      backgroundColor: colors[color][700],
    },
    fontWeight: "bold",
  }));
  return (
    <ColorButton variant={variant} onClick={handleClick}>
      {text}
    </ColorButton>
  );
};

export default CustomButton;
