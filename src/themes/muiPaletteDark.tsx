import { ThemeOptions } from "@mui/material";

export const muiPaletteDark: ThemeOptions = {
  palette: {
    primary: {
      main: "#212842", // Midnight Indigo
    },
    secondary: {
      main: "#F0E7D5", // Vanilla Cream
    },
    action: {
      active: "#37b02b", // Leaf Green 400
      hover: "#24871f", // Leaf Green 600
      disabled: "#b9eab7", // Leaf Green 200
    },
    background: {
      default: "#060a15", // Midnight Indigo 900
      paper: "#060a15", // Same
    },
    text: {
      primary: "#F0E7D5", // Vanilla Cream for contrast on dark background
    },
    divider: "#2f3652", // Desaturated indigo-gray (subtle, non-intrusive divider)
  },
};
