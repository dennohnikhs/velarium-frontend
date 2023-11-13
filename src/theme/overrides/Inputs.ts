import { Theme, ThemeOptions } from "@mui/material/styles";

const Inputs = (_theme: Theme): ThemeOptions["components"] => {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
        },
      },
    },
  };
};

export default Inputs;
