import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { FieldDescriptionIcon } from "components/FieldDescription";
import { Controller, useFormContext } from "react-hook-form";
import { ColorSchema } from "theme/palette";

// ----------------------------------------------------------------------

interface IProps {
  name: string;
  helperText?: null | string;
  description?: FieldDescriptionType;
  color?: ColorSchema;
}

export default function RHFTextField({
  name,
  helperText,
  description,
  required,
  ...other
}: IProps & TextFieldProps) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error} fullWidth>
          <TextField
            {...{ ...field, value: field.value || "" }}
            onChange={({ target: { value } }) => {
              setValue(name, other.type === "number" ? Number(value) : value);
            }}
            fullWidth
            error={!!error}
            {...(other as any)}
            InputProps={{
              endAdornment: !!description && description.length > 0 && (
                <FieldDescriptionIcon description={description} />
              ),
            }}
            InputLabelProps={{
              required,
            }}
          />
          {(!!helperText || (error && error.message)) && (
            <FormHelperText error={!!error}>
              {!!error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
