// form
// @mui
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import { Controller, useFormContext } from "react-hook-form";

// ----------------------------------------------------------------------

interface RHFCheckboxProps extends Omit<FormControlLabelProps, "control"> {
  name: string;
}

export function RHFCheckbox({ name, ...other }: RHFCheckboxProps) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox {...field} checked={field.value ?? false} />
          )}
        />
      }
      {...other}
    />
  );
}

// ----------------------------------------------------------------------

interface RHFMultiCheckboxProps
  extends Omit<FormControlLabelProps, "control" | "label"> {
  name: string;
  options: { label: string; value: any }[];
  label: string;
  error?: boolean;
  helperText?: string;
}

export function RHFMultiCheckbox({
  name,
  options,
  label,
  helperText,
  ...other
}: RHFMultiCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const value = field.value ?? [];

        const onSelected = (option: string) =>
          value.includes(option)
            ? value.filter((value: string) => value !== option)
            : [...value, option];

        return (
          <FormGroup>
            {!!label && <FormLabel error={!!error}>{label}</FormLabel>}

            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={value.includes(option.value)}
                    onChange={() => field.onChange(onSelected(option.value))}
                  />
                }
                {...other}
                label={option.label}
              />
            ))}
            {!!(helperText || !!error) && (
              <FormHelperText error={!!error}>
                {error?.message ?? helperText}
              </FormHelperText>
            )}
          </FormGroup>
        );
      }}
    />
  );
}
