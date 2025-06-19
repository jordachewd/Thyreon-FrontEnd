import type { Config } from "tailwindcss";
import tailwindcssAnimated from "tailwindcss-animated";

const config: Config = {
  darkMode: ["class", '[data-wpguard-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          100: "#d0d3dc",
          200: "#a2a7b9",
          300: "#737b96",
          400: "#212842",
          500: "#1b2239",
          600: "#161c30",
          700: "#111627",
          800: "#0b101e",
          900: "#060a15",
        },
        vanilla: {
          100: "#fffdf9",
          200: "#fbf6ed",
          300: "#f5efdf",
          400: "#f0e7d5",
          500: "#d9d0bf",
          600: "#c2b9a9",
          700: "#aca293",
          800: "#958b7d",
          900: "#7f7568",
        },
      },

      screens: {
        /*    
        Tailwind default breakpoints
        sm:	"640px"	,
        md:	"768px"	,
        lg:	"1024px",	
        xl:	"1280px", 
        */
        xxl: "1440px",
        /*     "2xl":	"1536px", // default */
        "3xl": "1600px",
      },

      maxWidth: {
        edge: "96%",
      },

      maxHeight: {
        edge: "92%",
      },

      fontSize: {
        xxs: "0.625rem",
        "2xs": "0.5rem",
      },
    },
  },
  plugins: [tailwindcssAnimated],
};

export default config;
