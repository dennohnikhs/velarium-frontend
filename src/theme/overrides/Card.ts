import { Theme, ThemeOptions } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Card(theme: Theme): ThemeOptions["components"] {
  return {
    MuiCard: {
      defaultProps: { variant: "elevation" },
      styleOverrides: {
        root: {
          position: "relative",
          borderRadius: Number(theme.shape.borderRadius) * 2,
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
      variants: [
        {
          props: { variant: "elevation" },
          style: {
            boxShadow: theme.customShadows.card,
          },
        },
      ],
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: "h6" },
        subheaderTypographyProps: {
          variant: "body2",
          marginTop: theme.spacing(0.5),
        },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
  };
}
