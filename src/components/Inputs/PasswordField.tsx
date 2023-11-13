import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { ComponentProps, forwardRef, useState } from "react";

function PasswordField(
  {
    label: _label,
    helperText,
    error,
    hideToggler,
    ...props
  }: ComponentProps<typeof OutlinedInput> & {
    helperText?: string | string[];
    hideToggler?: boolean;
  },
  ref
) {
  const [show, setShow] = useState(false);

  const handleClickShowPassword = () => {
    setShow((v) => !v);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const label = _label || "Password";

  return (
    <FormControl
      variant="outlined"
      error={error}
      required={props.required}
      ref={ref}
      fullWidth={props.fullWidth}
    >
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        type={show ? "text" : "password"}
        {...props}
        error={error}
        endAdornment={
          !hideToggler && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }
        label={label}
      />
      {!!helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

export default forwardRef(PasswordField);
