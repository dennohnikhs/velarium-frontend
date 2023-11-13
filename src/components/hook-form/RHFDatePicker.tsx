import TextField from "@mui/material/TextField";
// import YearPicker from "@mui/lab/YearPicker";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";

import { Controller, useFormContext } from "react-hook-form";
import { ColorSchema } from "theme/palette";

export default function RHFDatePicker({
  name,
  label,
  required,
  ...other
}: {
  label: string;
  name: string;
  color?: ColorSchema;
  required?: boolean;
  helperText?: null | string;
} & Partial<DatePickerProps<any, any>>) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, value, ...field }, fieldState: { error } }) => (
        <DatePicker
          // clearable
          // allowSameDateSelection
          // showTodayButton
          value={value || null}
          label={label}
          {...other}
          {...field}
          onChange={(e) => {
            setValue(name, e?.toString() ?? null);
          }}
          renderInput={(props) => (
            <TextField
              fullWidth
              {...props}
              name={name}
              error={!!error}
              color={other.color}
              helperText={error?.message ?? other.helperText}
              ref={ref}
              required={!!required}
            />
          )}
        />
      )}
    />
  );
}
