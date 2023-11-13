// form
// @mui
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup, { RadioGroupProps } from "@mui/material/RadioGroup";
import { Controller, useFormContext } from "react-hook-form";

// ----------------------------------------------------------------------

interface IProps {
  name: string;
  options: { label: string; value: any }[];
  getOptionLabel?: string[];
  label?: string;
}

export default function RHFRadioGroup({
  name,
  options,
  getOptionLabel,
  label,
  ...other
}: IProps & RadioGroupProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...field }, fieldState: { error } }) => (
        <div>
          {!!label && <FormLabel>{label}</FormLabel>}{" "}
          <RadioGroup {...field} value={value || null} row {...other}>
            {options.map((option, index) => (
              <FormControlLabel
                key={option.label}
                value={option.value}
                checked={option.value == value}
                control={<Radio />}
                label={
                  getOptionLabel?.length ? getOptionLabel[index] : option.label
                }
              />
            ))}
          </RadioGroup>
          {!!error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
