import { ThemeOptions } from "@mui/material";
import { dosis } from "./muiBase";

export const muiComponents: ThemeOptions = {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          lineHeight: 1.4,
          fontSize: ".85rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: 0,
          letterSpacing: "1px",
          fontFamily: dosis.style.fontFamily,
          transition: "all 0.35s ease-in-out",
          borderRadius: "0.5rem",
        },
        text: {
          lineHeight: 1,
          padding: "5px 15px",
          color: "var(--mui-palette-action-active)",
          "&:hover": {
            color: "var(--mui-palette-action-hover)!important",
          },
        },
        outlined: {
          "&:not(.MuiButton-colorInfo):not(.MuiButton-colorWarning):not(.MuiButton-colorError)":
            {
              borderColor: "var(--mui-palette-action-active)",
              color: "var(--mui-palette-action-active)",
              "&:hover": {
                borderColor: "var(--mui-palette-action-hover)",
                color: "var(--mui-palette-action-hover)!important",
              },
            },
        },
        contained: {
          "&:not(.MuiButton-colorInfo):not(.MuiButton-colorWarning):not(.MuiButton-colorError)":
            {
              color: "var(--mui-palette-common-white)",
              backgroundColor: "var(--mui-palette-action-active)",
              boxShadow:
                "0px 1px 4px 0px rgba(var(--mui-palette-secondary-mainChannel) / 0.3)",
              "&:hover": {
                color: "var(--mui-palette-common-white)!important",
                backgroundColor: "var(--mui-palette-action-hover)",
              },
            },
        },
        sizeSmall: {
          fontSize: "0.875rem",
        },
        sizeMedium: {
          fontSize: "1.25rem",
        },
        sizeLarge: {
          fontSize: "1.5rem",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeSmall: {
          padding: ".5rem .75rem",
          transition: "all 0.35s ease-in-out",
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          "&:before": {
            display: "none",
          },
          "&:after": {
            display: "none",
          },
          "&.Mui-focused": {
            borderColor: "var(--mui-palette-action-active)",
          },
        },
        input: {
          fontSize: ".875rem",
          lineHeight: 1,
          // padding: "0.25rem 0.35rem!important",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: ".75rem",
          color: "var(--mui-palette-text-secondary)",
          lineHeight: 1,
          "&.Mui-focused": {
            color: "var(--mui-palette-action-active)",
          },
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 28,
          height: 28,
          fontSize: "13px",
          color: "var(--mui-palette-common-white)",
          backgroundColor: "var(--mui-palette-primary-main)",
        },
        circular: {
          boxShadow:
            "0px 0px 5px 0px rgba(var(--mui-palette-secondary-mainChannel) / 0.5)",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        arrow: {
          color: "var(--mui-palette-secondary-main)",
        },
        tooltip: {
          color: "var(--mui-palette-primary-main)",
          backgroundColor: "var(--mui-palette-secondary-main)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          // height: "auto",
          // borderRadius: "0.5rem",
          // color: "var(--mui-palette-primary-dark)",
          // borderColor: "var(--mui-palette-primary-dark)",
          transition: "all 0.35s ease-in-out",
        },

        label: {
          textTransform: "capitalize",
          fontSize: "0.725rem",
          lineHeight: 0.75,
        },
        /*         
        clickable: {
          "&:hover": {
            color: "var(--mui-palette-common-white)",
            borderColor: "var(--mui-palette-primary-main)",
            backgroundColor: "var(--mui-palette-primary-main)!important",
            ".MuiChip-icon": {
              color: "var(--mui-palette-common-white)",
            },
          },
        }, */
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: "8px",
          marginTop: "2.5rem",
          boxShadow:
            "0px 0px 6px 0px rgba(var(--mui-palette-secondary-mainChannel) / 0.2)",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({}) => ({
          fontSize: ".875rem",
          padding: ".5rem 1.25rem",
          transition: "all 0.35s ease-in-out",
          minWidth: "180px",
          textDecoration: "none",
          color: "var(--mui-palette-text-primary)",
          "&:hover": {
            backgroundColor: "var(--mui-palette-primary-main)",
            color: "var(--mui-palette-common-white)",
          },
        }),
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:not(:last-child)": {
            borderBottom: 0,
          },
          "&:before": {
            display: "none",
          },
        },
      },
    },
  },
};
