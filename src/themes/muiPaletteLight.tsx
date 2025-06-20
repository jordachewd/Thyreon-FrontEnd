import { ThemeOptions } from "@mui/material";

export const muiPaletteLight: ThemeOptions = {
  palette: {
    primary: {
      main: "#F0E7D5", // Vanilla Cream
    },
    secondary: {
      main: "#212842", // Midnight Indigo
    },
    action: {
      active: "#37b02b", // Leaf Green 400
      hover: "#24871f", // Leaf Green 600
      disabled: "#b9eab7", // Leaf Green 200
    },
    background: {
      default: "#fffdf9", // Vanilla Cream 100
      paper: "#fffdf9", // Same
    },
    text: {
      primary: "#212842", // Midnight Indigo for strong contrast on light background
    },
    divider: "#d4cec0", // Subtle cream-gray for soft separation
  },
};
