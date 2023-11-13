// form
// @mui
import OTPField, { OTPFieldProps } from "components/Inputs/OTPField";
import { Controller, useFormContext } from "react-hook-form";

// ----------------------------------------------------------------------

interface IProps {
  name: string;
}

export default function RHFOTPField({
  name,
  ...other
}: IProps &
  Omit<OTPFieldProps, "helperText" | "error" | "value" | "onChange">) {
  const { control, setValue, trigger } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <OTPField
          {...other}
          value={field.value}
          error={!!error}
          helperText={error?.message}
          onChange={(val) => {
            setValue(field.name, val);
            trigger(field.name);
          }}
        />
      )}
    />
  );
}
