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
      active: "#212842", // Midnight Indigo
      hover: "#3a456f", // Lighter indigo tone for hover
      disabled: "#c9c4ba", // Muted cream-gray for disabled UI
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
