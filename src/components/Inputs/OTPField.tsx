import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import { alpha, styled } from "@mui/material/styles";
import dynamic from "next/dynamic";
import { createRef, Fragment, useLayoutEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { simulateClock } from "utils/functions";

export type OTPFieldProps = {
  onResend?: (callback: (a: number) => void) => void;
  onChange: (value: string) => void;
  onBlur?: (e?: React.ChangeEvent) => any;
  onFocus?: (e: React.ChangeEvent) => any;
  value: string;
  name?: string;
  fieldSize?: number;
  otpExpiry: number;
  helperText?: string;
  error?: boolean;
};

const OTPField = ({
  onChange,
  onResend,
  value,
  otpExpiry,
  fieldSize: _fieldSize,
  helperText,
  error,
}: OTPFieldProps) => {
  const fieldSize = _fieldSize || 4;
  const fields = Array.from(Array(fieldSize));
  // const input = useMemo(() => document.createElement("input"), []);

  const [{ otpTimer, focused }, setState] = useState({
    otpTimer: otpExpiry,
    focused: false,
  });

  const shrink = !!value || focused;

  const handleChange = (e: string) => {
    onChange(e);
  };

  const getInputStyles = () => {
    const styles = [
      outlinedInputClasses.input,
      outlinedInputClasses.notchedOutline,
      outlinedInputClasses.root,
    ];

    if (error) styles.push(outlinedInputClasses.error);

    return styles.join(" ");
  };

  const ref = createRef<HTMLDivElement>();

  const handleFocus = () => setState((a) => ({ ...a, focused: true }));
  const handleBlur = () => setState((a) => ({ ...a, focused: false }));

  useLayoutEffect(() => {
    const container = ref.current;
    if (container) {
      const inputs = container.querySelectorAll("input");
      Array.from(inputs)?.forEach((input) => {
        input.addEventListener("focus", handleFocus);
        input.addEventListener("blur", handleBlur);
      });
    }

    return () => {
      if (container) {
        const inputs = container.querySelectorAll("input");
        Array.from(inputs)?.forEach((input) => {
          input.removeEventListener("focus", handleFocus);
          input.removeEventListener("blur", handleBlur);
        });
      }
    };
  }, [ref]);

  useLayoutEffect(() => {
    const interval = setTimeout(() => {
      setState((prev) => {
        const next = prev.otpTimer - 1;
        return {
          ...prev,
          otpTimer: next >= 0 ? prev.otpTimer - 1 : prev.otpTimer,
        };
      });
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [setState, otpTimer]);

  return (
    // <NoSsr>
    <Stack spacing={2} ref={ref}>
      <FormControl error={error}>
        <OTPFormControl error={error} variant="outlined">
          <InputLabel variant="outlined" shrink={shrink}>
            Otp
          </InputLabel>
          <OtpInput
            numInputs={fieldSize}
            value={value}
            onChange={handleChange}
            isInputNum
            placeholder={fields.map(() => "-").join("")}
            containerStyle="container"
            errorStyle="Mui-error"
            inputStyle={getInputStyles()}
          />
        </OTPFormControl>
        {error && helperText && (
          <FormHelperText error={error}>{helperText}</FormHelperText>
        )}
      </FormControl>

      {onResend && (
        <Button
          variant="text"
          color="secondary"
          disableElevation
          type="button"
          disabled={otpTimer !== 0}
          onClick={() => {
            onResend?.((otpTimer) => setState((b) => ({ ...b, otpTimer })));
          }}
          sx={(theme) => ({
            background: alpha(theme.palette.info.light, 0.1),
            color: theme.palette.info.dark,
          })}
        >
          Resend
          {otpTimer !== 0 && <Fragment> in {simulateClock(otpTimer)}</Fragment>}
        </Button>
      )}
    </Stack>
    // </NoSsr>
  );
};

const OTPFormControl = styled(FormControl)(({ theme }) => {
  return {
    label: {
      zIndex: 1,
      background: theme.palette.background.paper,
    },
    flexDirection: "row",
    ".container": {
      "div:not(:last-of-type)": {
        paddingRight: "10px",
      },

      div: {
        width: "100%",
      },
      flex: 1,
      display: "flex",
      justifyContent: "space-between",
      height: "3.5em",
      input: {
        flex: 1,
        height: "100%",
        padding: "4px 0 5px",
        color: theme.palette.grey[700],
        borderColor: theme.palette.grey[400],
        borderStyle: "solid",
        // background: theme.palette.grey[200],
        borderWidth: 1,
        borderRadius: theme.shape.borderRadius,
        fontSize: 20,

        "&:focus": {
          borderColor: theme.palette.primary.main,
          outline: "none",
          borderWidth: 2,
          transition: `.1s ${theme.transitions.easing.easeIn}`,
        },
        "&.Mui-error": {
          borderColor: theme.palette.error.main,
        },
      },
    },
  };
});

export default dynamic(() => Promise.resolve(OTPField), { ssr: false });
