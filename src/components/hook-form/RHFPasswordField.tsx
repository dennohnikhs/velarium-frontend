import PasswordField from "components/Inputs/PasswordField";
import { ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function RHFPasswordField({
  name,
  ...props
}: ComponentProps<typeof PasswordField>) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <PasswordField
          {...props}
          {...field}
          error={!!fieldState.error && fieldState.isTouched}
          helperText={fieldState.isTouched && fieldState.error?.message}
        />
      )}
    />
  );
}
