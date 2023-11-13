import { Theme } from "@mui/material/styles";
import { ColorSchema } from "theme/palette";

// ----------------------------------------------------------------------

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        sizeMedium: {
          minHeight: 36,
        },
        sizeLarge: {
          height: 48,
        },

        // contained
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z8,
          "&:hover": {
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {
          boxShadow: theme.customShadows.primary,
        },
        containedSecondary: {
          boxShadow: theme.customShadows.secondary,
        },
        containedInfo: {
          boxShadow: theme.customShadows.info,
        },
        containedSuccess: {
          boxShadow: theme.customShadows.success,
        },
        containedWarning: {
          boxShadow: theme.customShadows.warning,
        },
        containedError: {
          boxShadow: theme.customShadows.error,
        },
        // outlined
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },

        // textContained
        textContained({
          ownerState,
          theme,
        }: {
          ownerState: any;
          theme: Theme;
        }) {
          const _color = (ownerState.color || "primary") as ColorSchema;
          const color = theme.palette[_color] ?? theme.palette.primary;

          return {
            backgroundColor: theme.alpha(color.lighter, 0.5),
            boxShadow: theme.customShadows[_color],
            color: color.main,
            "&:hover": {
              backgroundColor: theme.alpha(color.lighter, 0.7),
            },
          };
        },
      },
    },
  };
}

declare module "@mui/material/Button" {
  export interface ButtonPropsVariantOverrides {
    textContained: true;
  }
}
