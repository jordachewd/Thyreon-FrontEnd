import { ThemeOptions } from "@mui/material";
import { Dosis, Albert_Sans } from "next/font/google";

export const dosis = Dosis({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-jwd-dosis",
  display: "swap",
});

const albertsans = Albert_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jwd-albertsans",
  display: "swap",
});

const base: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },

  typography: {
    fontFamily: albertsans.style.fontFamily,

    h1: {
      fontSize: "4rem",
      fontFamily: dosis.style.fontFamily,
      color: "var(--mui-palette-text-primary)",
      "@media (min-width:1024px)": {
        fontSize: "4.5rem",
      },
      "@media (min-width:1080px)": {
        fontSize: "5rem",
      },
    },

    h2: {
      fontSize: "3rem",
      fontFamily: dosis.style.fontFamily,
      color: "var(--mui-palette-text-primary)",
      "@media (min-width:1024px)": {
        fontSize: "3.5rem",
      },
      "@media (min-width:1080px)": {
        fontSize: "4rem",
      },
    },

    h3: {
      fontSize: "2.2rem",
      fontFamily: dosis.style.fontFamily,
      color: "var(--mui-palette-text-primary)",
      "@media (min-width:1024px)": {
        fontSize: "2.4rem",
      },
      "@media (min-width:1080px)": {
        fontSize: "2.6rem",
      },
    },

    h4: {
      fontSize: "1.6rem",
      fontFamily: dosis.style.fontFamily,
      color: "var(--mui-palette-text-primary)",
      "@media (min-width:1024px)": {
        fontSize: "1.8rem",
      },
      "@media (min-width:1080px)": {
        fontSize: "2rem",
      },
    },

    h5: {
      fontSize: "1.2rem",
      fontFamily: dosis.style.fontFamily,
      color: "var(--mui-palette-text-primary)",
      "@media (min-width:1024px)": {
        fontSize: "1.4rem",
      },
      "@media (min-width:1080px)": {
        fontSize: "1.6rem",
      },
    },

    h6: {
      fontSize: "1rem",
      fontFamily: dosis.style.fontFamily,
      color: "var(--mui-palette-text-primary)",
      "@media (min-width:1024px)": {
        fontSize: "1.1rem",
      },

      "@media (min-width:1080px)": {
        fontSize: "1.2rem",
      },
    },

    subtitle1: {
      fontSize: "2rem",
      lineHeight: 1.4,
      fontFamily: albertsans.style.fontFamily,
      color: "var(--mui-palette-text-primary)",
      "@media (min-width:768px)": {
        fontSize: "2.5rem",
      },
      "@media (min-width:1024px)": {
        fontSize: "3rem",
      },
    },

    subtitle2: {
      fontSize: "1.5rem",
      lineHeight: 1.4,
      fontFamily: albertsans.style.fontFamily,
      color: "var(--mui-palette-text-primary)",
      "@media (min-width:768px)": {
        fontSize: "1.75rem",
      },
      "@media (min-width:1024px)": {
        fontSize: "2rem",
      },
    },

    body1: {
      fontSize: "1rem",
      fontFamily: albertsans.style.fontFamily,
      color: "var(--mui-palette-text-primary)",
    },

    body2: {
      fontSize: ".85rem",
      fontFamily: albertsans.style.fontFamily,
      color: "var(--mui-palette-text-primary)",
    },
  },
};

export default base;
