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
      active: "#F0E7D5", // Vanilla Cream (same as secondary)
      hover: "#bdb6a6", // Slightly darker cream (for subtle hover contrast)
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
