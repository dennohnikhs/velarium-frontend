//mui theme settings

import {
  alpha,
  createTheme,
  darken,
  lighten,
  Theme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { useMemo } from "react";
import breakpoints from "./breakpoints";
import overrides from "./overrides";
import palette from "./palette";
import shadows, { customShadows } from "./shadows";
import typography from "./typography";

const mode = "light" as const;

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useMemo(() => {
    const theme = createTheme({
      palette: palette[mode],
      typography,
      customShadows: customShadows[mode],
      alpha,
      lighten,
      darken,
      shape: {
        borderRadius: 10,
      },
      breakpoints,
      shadows: shadows[mode],
    });

    theme.components = overrides(theme) as Theme["components"];

    return theme;
  }, []);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

declare module "@mui/material/styles" {
  type ThemeFunctions = {
    alpha: (color: string, opacity: number) => string;
    darken: (color: string, opacity: number) => string;
    lighten: (color: string, opacity: number) => string;
  };
  export interface ThemeOptions extends ThemeFunctions {
    alpha: typeof alpha;
  }

  interface Theme extends ThemeFunctions {
    alpha: (color: string, opacity: number) => string;
    darken: (color: string, opacity: number) => string;
    lighten: (color: string, opacity: number) => string;
  }
}

export { ThemeProvider };
